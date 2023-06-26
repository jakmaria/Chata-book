import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { User } from '@prisma/client';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});

const GET_USER_DATA = gql`
  query getUserData($email: String!) {
    user(email: $email) {
      id
      name
      surname
      email
      telephone
      roleId
      role {
        name
      }
    }
  }
`;

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });

        const { data } = await client.query({
          query: GET_USER_DATA,
          variables: { email: user.email },
        });

        if (data && data.user) {
          setUserData(data.user);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const signUp = (email: string, password: string, userData: User) => {
    return createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
      const user = userCredential.user;

      setUserData(userData);
    });
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Fetch user data from GraphQL server after successful login
        client
          .query({
            query: GET_USER_DATA,
            variables: { email: user.email },
          })
          .then((result) => {
            // Update userData state with the data fetched from the server
            setUserData(result.data.user);
          })
          .catch((error) => {
            console.error('Error fetching user data', error);
          });
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          return 'The password you entered is not correct.';
        } else if (error.code === 'auth/user-not-found') {
          return 'No user found with this email.';
        } else {
          return 'An unknown error occurred.';
        }
      });
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout, userData, setUserData }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { User } from '@prisma/client';
import { getAuth, updateProfile } from 'firebase/auth';

type FormData = {
  name: string;
  surname: string;
  password: string;
  email: string;
  telephone: string;
};

const CREATE_USER_MUTATION = gql`
  mutation createUserMutation(
    $name: String!
    $surname: String!
    $email: String!
    $telephone: String!
  ) {
    createUser(name: $name, surname: $surname, email: $email, telephone: $telephone) {
      user {
        id
        name
        surname
        email
        telephone
      }
    }
  }
`;

export default function SignUp() {
  const { signUp } = useAuth();
  const auth = getAuth();
  const user = auth.currentUser;

  const [newUserData, setNewUserData] = useState<User>();

  const [registrationData, setRegistrationData] = useState<FormData>({
    name: '',
    surname: '',
    password: '',
    email: '',
    telephone: '',
  });

  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    variables: {
      name: registrationData.name,
      surname: registrationData.surname,
      password: registrationData.password,
      email: registrationData.email,
      telephone: registrationData.telephone,
    },
  });

  const handleRegistration = async (e: any) => {
    e.preventDefault();

    try {
      await signUp(registrationData.email, registrationData.password);
      const newUser = await createUser();
      await setNewUserData(newUser.data.createUser.user);
      console.log('createuser opoved', newUser.data.createUser.user);
    } catch (err) {
      console.log(err);
    }
  };

  if (newUserData && user) {
    updateProfile(user, {
      displayName: newUserData.name,
    });
    console.log("user.displayName", user.displayName)
  }

  return (
    <>
      {!newUserData ? (
        <form className="flex flex-col gap-1" onSubmit={handleRegistration}>
          <label>Meno</label>
          <input
            required
            type="text"
            value={registrationData.name}
            placeholder="Meno"
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                name: e.target.value,
              })
            }
          />
          <label>Priezvisko</label>
          <input
            required
            type="text"
            value={registrationData.surname}
            placeholder="Priezvisko"
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                surname: e.target.value,
              })
            }
          />
          <label>Heslo</label>
          <input
            type="password"
            required
            value={registrationData.password}
            placeholder="Heslo"
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                password: e.target.value,
              })
            }
          />
          <label>E-mail</label>
          <input
            type="email"
            required
            value={registrationData.email}
            placeholder="E-mail"
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                email: e.target.value,
              })
            }
          />
          <label>Tel. číslo</label>
          <input
            type="text"
            required
            placeholder="Tel. číslo vo formáte +421"
            value={registrationData.telephone}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                telephone: e.target.value,
              })
            }
          />

          <input className="bg-white" type="submit" />
        </form>
      ) : (
        user && (
          <p className="bg-white  text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow font-gloock text-base">
            Novy uzivatel {newUserData.name} {newUserData.surname} bol vytvoreny, prihlásenie
            prebehlo automaticky.
          </p>
        )
      )}
    </>
  );
}

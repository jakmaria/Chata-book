import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const GET_USER_NAME = gql`
  query GetUser($email: String!) {
    user(email: $email) {
      name
    }
  }
`;

export default function Header() {
  const { user, signUp } = useAuth();

  const { data, loading, error } = useQuery(GET_USER_NAME, {
    variables: { email: user.email },
  });
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return <>{user ? <p>Name of the user logged in is {data.user.name}</p> : null}</>;
}

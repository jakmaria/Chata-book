import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const GET_USER_NAME = gql`
  query {
    user(email: String) {
      name
    }
  }
`;

export default function Header() {
  const { user, signUp } = useAuth();

  const { data, loading, error } = useQuery(GET_USER_NAME, user.email);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return <>{user ? <p>Prihlaseny uzivatel je {data.name}</p> : null}</>;
}

import { getAuth } from 'firebase/auth';

export default function Header() {
  const auth = getAuth();
  const user = auth.currentUser;

  return <>{user?.displayName ? <p>Name of the user logged in is {user.displayName}</p> : null}</>;
}

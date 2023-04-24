import { getAuth } from 'firebase/auth';

export default function Header() {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log('displayName', user?.displayName);


  return <>{user?.displayName ? <p>Name of the user logged in is {user.displayName}</p> : null}</>;
}

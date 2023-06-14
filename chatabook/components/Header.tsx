import { getAuth } from 'firebase/auth';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const auth = getAuth();
  const user = auth.currentUser;
  const userData = useAuth();

  return (
    <>
      <div className="">
        {user?.displayName ? <p>Name of the user logged in is {user.displayName}</p> : null}
        {userData?.userData?.role ? <h1>Role name is {userData.userData.role.name}</h1> : null}
        <h1>Role number is {userData.userData.roleId}</h1>
      </div>
    </>
  );
}

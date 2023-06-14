import { getAuth } from 'firebase/auth';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const auth = getAuth();
  const user = auth.currentUser;
  const userData = useAuth();

  let roleMessage;

  if (userData?.userData?.role) {
    switch (userData.userData.role.name) {
      case 'basic':
        roleMessage = "Your role is only basic, unfortunately, there's not much you can do here.";
        break;
      case 'guest':
        roleMessage =
          'Your role is only guest so you can only view the events, but nothing more, I am sorry.';
        break;
      case 'user':
        roleMessage = `Welcome ${user?.displayName}! You are now allowed to create events and edit them.`;
        break;
      case 'admin':
        roleMessage =
          'Hello admin, you are the king of all users of this app. There is nothing you cannot do!';
        break;
      default:
        roleMessage = 'Unknown role.';
    }
  }

  return (
    <>
      <div className="">
        {user?.displayName ? <p>Name of the user logged in is {user.displayName}</p> : null}
        {userData?.userData?.role ? <h1>{roleMessage}</h1> : null}
        {userData?.userData?.roleId ? <h1>Role number is {userData.userData.roleId}</h1> : null}
      </div>
    </>
  );
}

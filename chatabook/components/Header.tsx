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
        roleMessage = 'Máš len základnú rolu, môžeš sa maximálne odhlásiť.';
        break;
      case 'guest':
        roleMessage = 'Si tu hosť. Môžeš udalosti len sledovať, ale nič viac..';
        break;
      case 'user':
        roleMessage = `Vitaj ${user?.displayName}! Teraz môžeš vytvárať udalosti a upravovať ich.`;
        break;
      case 'admin':
        roleMessage = `Ahoj ${user?.displayName}! Si admin, si kráľom všetkých užívateľov, nie je nič. na čo by si nemal právomoc :)`;
        break;
      default:
        roleMessage = 'Unknown role.';
    }
  }

  return (
    <>
      <div className="ml-auto mr-auto mt-2 bg-white text-gray-800 font-semibold py-2 px-20 text-center  border border-gray-400 rounded-xl font-gloock text-base leading-[35px] opacity-80">
        {user?.displayName ? <p>Prihlásený užívateľ je {user.displayName}.</p> : null}
        {userData?.userData?.role ? <h1>{roleMessage}</h1> : null}
        {/* {userData?.userData?.roleId ? <h1>Role number is {userData.userData.roleId}</h1> : null} */}
      </div>
    </>
  );
}

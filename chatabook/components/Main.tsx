import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Login from './Login';
import Register from './SignUp';

export default function Main() {
  const router = useRouter();
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { user, logout, userData } = useAuth();

  const showRegistrationForm = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };

  const showLoginForm = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
  };

  return (
    <>
      <div className="ml-[35%] mr-[35%] mt-30 flex flex-col gap-[3rem]">
        <h1 className="text-5xl mt-10 font-gloock max-md:text-orange-200 max-md:mt-55">Chata</h1>
        {!user && (
          <button
            onClick={showRegistrationForm}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow font-gloock text-base"
          >
            Zaregistruj sa
          </button>
        )}
        {showRegister && <Register />}
        {user ? (
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow font-gloock text-base"
          >
            Odhlásit sa
          </button>
        ) : (
          <button
            onClick={showLoginForm}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow font-gloock text-base"
          >
            Prihlás sa
          </button>
        )}
        {showLogin && <Login />}
        {user && userData.roleId !== 1 && (
          <button
            onClick={() => {
              router.push('/events');
            }}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow font-gloock text-base"
          >
            {' '}
            Zobrazit udalosti
          </button>
        )}
      </div>
    </>
  );
}

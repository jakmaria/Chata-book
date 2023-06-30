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

  const titleColor = !user && (showRegister || showLogin) ? '[#1e2024]' : 'orange-200';
  let titleMargin = showRegister || showLogin ? 'mt-5' : 'mt-55';
  if (user) {
    titleMargin = 'mt-30';
  }

  return (
    <>
      <div
        className={`ml-[35%] mr-[35%] mt-15 flex flex-col gap-5 max-md:ml-[10%] max-md:mr-[10%] max-md:${titleMargin}`}
      >
        <h1
          className={`text-[100px] mt-10 font-nothing font-light max-md:text-${titleColor} text-center max-md:mt-0`}
        >
          Chata
        </h1>
        {!user && (
          <button
            onClick={showRegistrationForm}
            className="bg-[#1e2024] hover:bg-[#d4bc98] hover:bg-opacity-80 hover:text-[#1e2024] text-[#d4bc98]  py-2 px-4 border border-[#d4bc98] hover:border-[#1e2024] rounded-xl shadow font-ysabeau font-light text-xl "
          >
            Zaregistrovať sa
          </button>
        )}
        {showRegister && <Register />}
        {user ? (
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="bg-[#1e2024] hover:bg-[#d4bc98] hover:bg-opacity-80 hover:text-[#1e2024] text-[#d4bc98]  py-2 px-4 border border-[#d4bc98] hover:border-[#1e2024] rounded-xl shadow font-ysabeau font-light text-xl "
          >
            Odhlásiť sa
          </button>
        ) : (
          <button
            onClick={showLoginForm}
            className="bg-[#1e2024] hover:bg-[#d4bc98] hover:bg-opacity-80 hover:text-[#1e2024] text-[#d4bc98]  py-2 px-4 border border-[#d4bc98] hover:border-[#1e2024] rounded-xl shadow font-ysabeau font-light text-xl "
          >
            Prihlásiť sa
          </button>
        )}
        {showLogin && <Login />}
        {user && userData && userData.roleId && userData.roleId > 1 && (
          <button
            onClick={() => {
              router.push('/events');
            }}
            className="bg-[#1e2024] hover:bg-[#d4bc98] hover:bg-opacity-80 hover:text-[#1e2024] text-[#d4bc98]  py-2 px-4 border border-[#d4bc98] hover:border-[#1e2024] rounded-xl shadow font-ysabeau font-light text-xl "
          >
            {' '}
            Zobraziť udalosti
          </button>
        )}
      </div>
    </>
  );
}

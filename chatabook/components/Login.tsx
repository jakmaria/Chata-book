import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

type LoginData = {
  email: string;
  password: string;
};

export default function Login() {
  const { login } = useAuth();

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showForm, setShowForm] = useState(true);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const errorMsg = await login(loginData.email, loginData.password);
      if (errorMsg) {
        console.log(errorMsg);
        setErrorMessage(errorMsg);
      } else {
        setShowForm(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!showForm) return null;

  return (
    <>
      <form
        className="flex flex-col gap-0 bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-600 rounded-xl shadow font-ysabeau bg-opacity-70"
        onSubmit={handleLogin}
      >
        <label className="font-light text-[#1e2024] bg-[#a6b6c1] p-1 border-2 border-[#1e2024] bg-opacity-100 rounded-xl rounded-b-none text-center mt-2">
          E-mail
        </label>
        <input
          className="rounded-xl  rounded-t-none border-2 border-[#1e2024] border-t-0 p-1 text-center bg-gray-200 bg-opacity-7"
          type="email"
          required
          value={loginData.email}
          placeholder="E-mail"
          onChange={(e) =>
            setLoginData({
              ...loginData,
              email: e.target.value,
            })
          }
        />
        <label className="font-light text-[#1e2024] bg-[#a6b6c1] p-1 border-2 border-[#1e2024] bg-opacity-100 rounded-xl rounded-b-none text-center mt-2">
          Heslo
        </label>
        <input
          className="rounded-xl  rounded-t-none border-2 border-[#1e2024] border-t-0 p-1 text-center bg-gray-200 bg-opacity-7"
          type="password"
          required
          value={loginData.password}
          placeholder="Heslo"
          onChange={(e) =>
            setLoginData({
              ...loginData,
              password: e.target.value,
            })
          }
        />

        <button
          className="bg-[#1e2024] hover:bg-[#a6b6c1] bg-opacity-90 hover:text-[#1e2024] text-[#d4bc98]  py-2 px-4 border-2 border-[#1e2024] hover:border-[#1e2024] rounded-xl shadow font-ysabeau text-lg font-medium mt-3"
          type="submit"
        >
          Potvrdiť
        </button>
      </form>
      {errorMessage && (
        <p className="text-xl rounded-md p-4 text-center bg-gray-200 bg-opacity-60 font-ysabeau text-[#1e2024]">
          {errorMessage}
        </p>
      )}
    </>
  );
}

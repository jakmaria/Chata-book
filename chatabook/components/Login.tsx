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

  const [showForm, setShowForm] = useState(true);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await login(loginData.email, loginData.password);
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (!showForm) return null;

  return (
    <>
      <form className="flex flex-col gap-1" onSubmit={handleLogin}>
        <label>E-mail</label>
        <input
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
        <label>Heslo</label>
        <input
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

        <input className="bg-white" type="submit" />
      </form>
    </>
  );
}

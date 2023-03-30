import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  name: string;
  surname: string;
  password: string;
  email: string;
  number: string;
};

export default function Registration() {
  const { user, signUp } = useAuth();
  console.log('user is', user);
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<FormData>();

  const [registrationData, setRegistrationData] = useState<FormData>({
    name: '',
    surname: '',
    password: '',
    email: '',
    number: '',
  });

  // const handleRegistration: SubmitHandler<FormData> = (data) => console.log(data);

  const handleRegistration = async (e: any) => {
    e.preventDefault();

    try {
      await signUp(registrationData.email, registrationData.password);
    } catch (err) {
      console.log(err);
    }

    console.log(registrationData);
  };

  return (
    <>
      <form className="flex flex-col gap-1" onSubmit={handleRegistration}>
        <label>Meno</label>
        <input
          required
          type="text"
          value={registrationData.name}
          placeholder="Meno"
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              name: e.target.value,
            })
          }
        />
        <label>Priezvisko</label>
        <input
          required
          type="text"
          value={registrationData.surname}
          placeholder="Priezvisko"
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              surname: e.target.value,
            })
          }
        />
        <label>Heslo</label>
        <input
          type="password"
          required
          value={registrationData.password}
          placeholder="Heslo"
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              password: e.target.value,
            })
          }
        />
        <label>E-mail</label>
        <input
          type="email"
          required
          value={registrationData.email}
          placeholder="E-mail"
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              email: e.target.value,
            })
          }
        />
        <label>Tel. číslo</label>
        <input
          type="text"
          required
          placeholder="Tel. číslo vo formáte +421"
          value={registrationData.number}
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              number: e.target.value,
            })
          }
        />

        <input className="bg-white" type="submit" />
      </form>
    </>
  );
}

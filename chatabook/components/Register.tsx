import { useAuth } from '@/context/AuthContext';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  name: string;
  surname: string;
  password: string;
  email: string;
  number: number;
};

export default function Register() {
  const { user, signUp } = useAuth();
  console.log('user is', user);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onRegisterSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <>
      <form className="flex flex-col gap-1" onSubmit={handleSubmit(onRegisterSubmit)}>
        <label>Meno</label>
        <input {...register('name', { required: true })} placeholder="Meno" />
        <label>Priezvisko</label>
        <input
          {...register('surname', {
            required: true,
          })}
          placeholder="Priezvisko"
        />
        <label>Heslo</label>
        <input
          type="password"
          {...register('password', { required: true, minLength: 8 })}
          placeholder="Heslo"
        />
        <label>E-mail</label>
        <input type="email" {...register('email', { required: true })} placeholder="email" />
        <label>Tel. číslo</label>
        <input
          type="text"
          {...register('number', { required: true, minLength: 9 })}
          placeholder="Tel. číslo vo formáte +421"
        />

        <input className="bg-white" type="submit" />
      </form>
    </>
  );
}

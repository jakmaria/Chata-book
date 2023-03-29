import { useForm, SubmitHandler } from 'react-hook-form';

type LoginData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginData>();

  const onLoginSubmit: SubmitHandler<LoginData> = (data) => console.log(data);

  return (
    <>
      <form className="flex flex-col gap-1" onSubmit={handleSubmit(onLoginSubmit)}>
        <label>E-mail</label>
        <input type="email" {...register('email', { required: true })} placeholder="email" />

        <label>Heslo</label>
        <input
          type="password"
          {...register('password', { required: true, minLength: 8 })}
          placeholder="Heslo"
        />

        <input className="bg-white" type="submit" />
      </form>
    </>
  );
}

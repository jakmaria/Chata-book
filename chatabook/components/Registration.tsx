import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

type FormData = {
  name: string;
  surname: string;
  password: string;
  email: string;
  telephone: string;
};

const CREATE_USER_MUTATION = gql`
  mutation createUserMutation(
    $name: String!
    $surname: String!
    $email: String!
    $telephone: String!
  ) {
    createUser(name: $name, surname: $surname, email: $email, telephone: $telephone) {
      user {
        id
        name
        surname
        email
        telephone
      }
    }
  }
`;

export default function Registration() {
  const { user, signUp } = useAuth();
  console.log('user is', user);

  const [registrationData, setRegistrationData] = useState<FormData>({
    name: '',
    surname: '',
    password: '',
    email: '',
    telephone: '',
  });

  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    variables: {
      name: registrationData.name,
      surname: registrationData.surname,
      password: registrationData.password,
      email: registrationData.email,
      telephone: registrationData.telephone,
    },
  });

  // const handleRegistration: SubmitHandler<FormData> = (data) => console.log(data);

  const handleRegistration = async (e: any) => {
    e.preventDefault();

    try {
      await signUp(registrationData.email, registrationData.password);
      const newUser = await createUser();
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
          value={registrationData.telephone}
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              telephone: e.target.value,
            })
          }
        />

        <input className="bg-white" type="submit" />
      </form>
    </>
  );
}

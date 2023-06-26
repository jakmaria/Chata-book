import { useAuth } from '@/context/AuthContext';
import { StrictMode, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { User } from '@prisma/client';
import { getAuth, updateProfile } from 'firebase/auth';
import validator from 'validator';

type FormData = {
  name: string;
  surname: string;
  password: string;
  email: string;
  telephone: string;
  roleId: number;
};

const CREATE_USER_MUTATION = gql`
  mutation createUserMutation(
    $name: String!
    $surname: String!
    $email: String!
    $telephone: String!
    $roleId: Int!
  ) {
    createUser(
      name: $name
      surname: $surname
      email: $email
      telephone: $telephone
      roleId: $roleId
    ) {
      user {
        id
        name
        surname
        email
        telephone
        roleId
        role {
          name
        }
      }
      success
      code
      message
    }
  }
`;

export default function SignUp() {
  const { signUp } = useAuth();
  const auth = getAuth();
  const user = auth.currentUser;

  const [newUserData, setNewUserData] = useState<User>();

  const [registrationData, setRegistrationData] = useState<FormData>({
    name: '',
    surname: '',
    password: '',
    email: '',
    telephone: '',
    roleId: 1,
  });

  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    variables: {
      name: registrationData.name,
      surname: registrationData.surname,
      password: registrationData.password,
      email: registrationData.email,
      telephone: registrationData.telephone,
      roleId: registrationData.roleId,
    },
  });

  const [showForm, setShowForm] = useState(true);

  const handleRegistration = async (e: any) => {
    e.preventDefault();

    if (registrationData.name.length < 3) {
      alert('Meno je príliš krátke');
      return;
    } else if (registrationData.surname.length < 3) {
      alert('Priezvisko je príliš krátke');
      return;
    } else if (!validator.isStrongPassword(registrationData.password)) {
      alert(
        'Použite silné heslo! \nMusí byť dlhé minimálne 8 znakov a obsahovať: \nVeľké a malé písmená \naspoň 1 špeciálny znak \naspoň 1 číslo'
      );
      return;
    } else if (!validator.isEmail(registrationData.email)) {
      alert('Vložte platný email!');
      return;
    } else if (
      !validator.isMobilePhone(registrationData.telephone, ['sk-SK'], { strictMode: true })
    ) {
      alert('Vložte platné telefónne číslo');
      return;
    }

    try {
      const newUser = await createUser();
      setShowForm(false);
      if (newUser.data.createUser.message === 'Daný email sa už používa.') {
        alert(newUser.data.createUser.message);
      }
      if (newUser) {
        await signUp(
          registrationData.email,
          registrationData.password,
          newUser.data.createUser.user
        );
      }
      await setNewUserData(newUser.data.createUser.user);
      console.log('createuser opoved', newUser.data.createUser.user);
    } catch (err) {
      console.log(err);
    }
  };

  if (newUserData && user) {
    updateProfile(user, {
      displayName: newUserData.name,
    });
    console.log('user.displayName', user.displayName);
  }

  if (!showForm) return null;
  return (
    <>
      {!newUserData ? (
        <form className="flex flex-col gap-1 w-50" onSubmit={handleRegistration}>
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
      ) : (
        user && (
          <p className="bg-white  text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow font-gloock text-base">
            Novy uzivatel {newUserData.name} {newUserData.surname} bol vytvoreny, prihlásenie
            prebehlo automaticky.
          </p>
        )
      )}
    </>
  );
}

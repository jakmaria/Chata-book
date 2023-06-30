import { useAuth } from '@/context/AuthContext';
import { StrictMode, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { User } from '@prisma/client';
import { getAuth, updateProfile } from 'firebase/auth';
import validator from 'validator';
import Label from './Label';

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
      if (newUser.data.createUser.message === 'Daný email sa už používa.') {
        alert(newUser.data.createUser.message);
        return;
      } else if (newUser.data.createUser.message === 'Telefónne číslo sa už používa.') {
        alert(newUser.data.createUser.message);
        return;
      }

      if (newUser) {
        await signUp(
          registrationData.email,
          registrationData.password,
          newUser.data.createUser.user
        );
      }
      await setNewUserData(newUser.data.createUser.user);
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (newUserData && user) {
    updateProfile(user, {
      displayName: newUserData.name,
    });
    // console.log('user.displayName', user.displayName);
  }

  if (!showForm) return null;
  return (
    <>
      {!newUserData ? (
        <form
          className="flex flex-col gap-0 bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-600 rounded-xl shadow font-ysabeau bg-opacity-70"
          onSubmit={handleRegistration}
        >
          {/* <label
            htmlFor="name"
            className="font-light text-[#1e2024] bg-[#a6b6c1] p-1 border-2 border-[#1e2024] bg-opacity-90 rounded-xl rounded-b-none text-center mt-2"
          >
            Meno
          </label> */}
          <Label htmlFor="name" text="Meno" />
          <input
            className="rounded-xl  rounded-t-none border-2 border-[#1e2024] border-t-0 p-1 text-center bg-opacity-7 bg-gray-200"
            required
            id="name"
            type="text"
            value={registrationData.name}
            placeholder=""
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                name: e.target.value,
              })
            }
          />
          <Label htmlFor="surname" text="Priezvisko" />
          <input
            className="rounded-xl  rounded-t-none border-2 border-[#1e2024] border-t-0 p-1 text-center bg-gray-200 bg-opacity-7"
            required
            id="surname"
            type="text"
            value={registrationData.surname}
            placeholder=""
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                surname: e.target.value,
              })
            }
          />
          <Label htmlFor="password" text="Heslo" />
          <input
            className="rounded-xl  rounded-t-none border-2 border-[#1e2024] border-t-0 p-1 text-center bg-gray-200 bg-opacity-7"
            type="password"
            id="password"
            required
            value={registrationData.password}
            placeholder=""
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                password: e.target.value,
              })
            }
          />
          <Label htmlFor="email" text="E-mail" />

          <input
            className="rounded-xl  rounded-t-none border-2 border-[#1e2024] border-t-0 p-1 text-center bg-gray-200 bg-opacity-7"
            type="email"
            id="email"
            required
            value={registrationData.email}
            placeholder=""
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                email: e.target.value,
              })
            }
          />
          <Label htmlFor="tel" text="Tel. číslo" />
          <input
            className="rounded-xl  rounded-t-none border-2 border-[#1e2024] border-t-0 p-1 text-center bg-gray-200 bg-opacity-7"
            type="text"
            id="tel"
            required
            placeholder="vo formáte +421"
            value={registrationData.telephone}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                telephone: e.target.value,
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
      ) : (
        user && (
          <p className="bg-white  text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow font-ysabeau text-base">
            Novy uzivatel {newUserData.name} {newUserData.surname} bol vytvoreny, prihlásenie
            prebehlo automaticky.
          </p>
        )
      )}
    </>
  );
}

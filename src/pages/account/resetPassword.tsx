import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/Navbar';

interface JwtPayload {
  firstName: string;
  lastName: string;
  email: string;
}

const ResetPassword = ({ token }) => {
  const router = useRouter();
  const [userCredentials, setUserCredentials] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const { newPassword, confirmNewPassword } = userCredentials;

  useEffect(() => {
    try {
      if (jwt.verify(token, process.env.NEXTAUTH_SECRET)) {
        const { email } = jwt.verify(
          token,
          process.env.NEXTAUTH_SECRET,
        ) as JwtPayload;

        setEmail(email);
      }
    } catch (error) {
      // toast("Link has expired");
      setError(true);
    }
  }, [token]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      return toast("Passwords don't match!");
    }
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: newPassword,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      if (!response.ok) throw new Error(json.message || 'Something went wrong');
      // alert("Password changed, please log in again");
      signOut();
      // router.replace('/auth/signin');
    } catch (error) {
      toast(error.message);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  return (
    <div>
      <ToastContainer />
      {
        !error ? (<form
          className="items-left flex max-w-full flex-col pt-3"
          onSubmit={handleSubmit}
        >
          <input
            className="mt-5 rounded-md border-2 border-solid py-1"
            type="text"
            placeholder="New Password"
            value={newPassword}
            name="newPassword"
            onChange={handleChange}
            required
            autoFocus
          />
          <input
            className="mt-5 rounded-md border-2 border-solid py-1"
            type="text"
            placeholder="Confirm new password"
            value={confirmNewPassword}
            name="confirmNewPassword"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            onClick={() => {
              alert('Password reset successfully!');
              router.push('/auth/signin');
            }}
            className="font-roboto mt-5 h-10 w-32 rounded-full bg-redc object-none object-left py-2 px-4 text-xs font-medium text-white"
          >
            Change password
          </button>
          
        </form>) : (
          <div>
          <Navbar />
          <section className="mt-40 bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
              <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
                <h2 className="mb-4 text-6xl font-bold leading-10 tracking-tight text-gray-900 dark:text-white">
                  Expired link
                </h2>
                <p className="mt-10 text-xl">
                Looks like your reset password link has expired. Please try to ask for a password reset again.
                </p>
                <button className='mr-3 mt-10 rounded-full border-2 border-solid border-redc py-2 px-7 text-justify text-lg leading-6 text-redc'>Email us</button>
                <p className='text-base font-bold mt-5'>rafflr@ordoetchao.com</p>
              </div>
            </div>
          </section>
        </div>
          
          )
      }
      
      
    </div>
  );
};

ResetPassword.getInitialProps = async ({ query }) => {
  const { token } = query;
  return { token };
};

export default ResetPassword;

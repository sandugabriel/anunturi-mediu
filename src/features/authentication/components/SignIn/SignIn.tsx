import { useRouter } from 'next/router';
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';

import { signIn } from 'next-auth/react';

import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Navbar from '@/components/Navbar';
import Link from 'next/link';

const SignIn: FC = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const { email, password } = userCredentials;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      const result = await signIn<'credentials'>('credentials', {
        redirect: false,
        email: email,
        password: password,
      });

      if (!result.error) {
        router.replace('/');
      } else {
        toast(result.error);
      }
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div>
      <Navbar />
      <div className="mt-20 flex flex-col items-center md:mt-40">
        <div className="items-left mr-6 w-2/5">
          <h1 className="font-sans text-4xl font-bold">Sign in</h1>
          <h2 className="mt-3">
            Dont have an account?{' '}
            <Link href="/auth/signup" className="text-blue-700">
              Sign up
            </Link>
          </h2>
          <form
            onSubmit={handleSubmit}
            className="items-left flex max-w-full flex-col pt-3"
          >
            <input
              className="mt-5 rounded-md border-2 border-solid py-1"
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={handleChange}
              name="email"
              autoComplete="email"
            />
            <input
              className="mt-5 rounded-md border-2 border-solid py-1"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={handleChange}
              name="password"
              autoComplete="password"
            />
            <button
              type="submit"
              className="font-roboto mt-5 h-10 w-32 rounded-full bg-redc object-none object-left py-2 px-4 text-xs font-medium text-white"
            >
              Sign in
            </button>
            <ToastContainer />
            {/* <div className='flex items-center pt-4'>
                <Image className='object-none object-left w-40 h-40' src={google} alt="google logo"/>
                <h2 className='text-lg'>Sign in with Google</h2>
              </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

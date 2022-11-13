import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import emailjs from 'emailjs-com';
import jwt from 'jsonwebtoken';

// import toast from 'react-hot-toast';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '@/components/Navbar';

const SignUp: FC = () => {
  const [userCredentials, setUserCredentials] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();

  const { firstName, lastName, email, password, confirmPassword } =
    userCredentials;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast("Password doesn't match");
      // return toast.error("Password don't match!");
    }

    try {

      const token = jwt.sign({ email }, process.env.NEXTAUTH_SECRET, {
        expiresIn: '1d',
      });

      // const link = process.env.HOST + '/account/verify?token=' + token;
      const link = 'https://rafflr.vercel.app/account/verify?token=' + token;
      // toast(link)
      console.log({
        link: link,
        email: email
      })
      emailjs
        .send(
          'service_4i4bini',
          'template_6v0r7jk',
          {
            link: link,
            email: email
          },
          'ugD_oGxJEf_4BQ1yN',
        )
        .then(
          async (result) => {
            toast('Verification email sent successfully!');
            const response = await fetch('/api/auth/signup', {
              method: 'POST',
              body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const json = await response.json();
      
            if (!response.ok) throw new Error(json.message || 'Something went wrong');
          },
          (error) => {
            toast(
              'There was an error sending the verification email, please try signing up again',
            );
            console.log(error);
          },
        );

        // setUserCredentials({
        //   firstName: '',
        //   lastName: '',
        //   email: '',
        //   password: '',
        //   confirmPassword: '',
        // });

      router.replace('/auth/signin');
    } catch (error) {
      console.log(error);
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
      <Navbar />
      <div className="mt-20 flex flex-col items-center">
        <div className="items-left mr-6">
          <h1 className="font-sans text-4xl font-bold">Create an Account</h1>
          <h2>
            Already have an account?<Link href="/signin">Sign in</Link>
          </h2>
          <form
            className="items-left flex max-w-full flex-col pt-3"
            onSubmit={handleSubmit}
          >
            <input
              className="mt-5 rounded-md border-2 border-solid py-1"
              type="text"
              placeholder="First Name"
              value={firstName}
              name="firstName"
              onChange={handleChange}
              required
              autoFocus
            />
            <input
              className="mt-5 rounded-md border-2 border-solid py-1"
              type="text"
              placeholder="Last Name"
              value={lastName}
              name="lastName"
              onChange={handleChange}
              required
            />
            <input
              className="mt-5 rounded-md border-2 border-solid py-1"
              type="email"
              placeholder="Email Address"
              value={email}
              name="email"
              onChange={handleChange}
              required
              autoComplete="email"
            />
            <input
              className="mt-5 rounded-md border-2 border-solid py-1"
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
            <input
              className="mt-5 rounded-md border-2 border-solid py-1"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              required
            />
            <h2 className="mt-5">
              By clicking Create account, I agree that I have read and accepted
              the Terms of Use and Privacy Policy.
            </h2>
            <button
              type="submit"
              className="font-roboto mt-5 h-10 w-32 rounded-full bg-redc object-none object-left py-2 px-4 text-xs font-medium text-white"
            >
              Create account
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

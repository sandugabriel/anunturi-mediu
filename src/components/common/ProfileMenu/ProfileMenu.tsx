import { FC, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { LogoutIcon, UserIcon } from '@heroicons/react/outline';
import cn from 'classnames';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import point from '../../../assets/Frame.png';
import 'react-toastify/dist/ReactToastify.css';
import jwt from 'jsonwebtoken';
import emailjs from 'emailjs-com';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';


type Props = {
  name: string;
  email: string;
  points: any;
};

const ProfileMenu: FC<Props> = ({ name, email, points }) => {
  const router = useRouter();
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <ToastContainer />
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md py-2 text-lg font-medium text-redc hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {name}
          {/* <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-indigo-100 hover:text-indigo-50"
            aria-hidden="true"
          /> */}
          <UserIcon className="mb-1 ml-3 h-6 w-10 border-spacing-3 fill-redc " />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-20 z-50 mt-2 w-56  origin-top-right rounded-tl-lg rounded-br-lg rounded-bl-lg border border-solid border-redc bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={cn(
                    'group flex w-full items-center justify-between gap-x-2 rounded-md border-b px-2 py-3 text-sm',
                    {
                      'bg-red-400 text-white': active,
                      'text-gray-900': !active,
                    },
                  )}
                  // onClick={() => signOut()}
                >
                  <span>Raffle points</span>
                  <div className="flex">
                    <span className="pr-1 text-lg font-bold">{points}</span>
                    <Image
                      src={point}
                      width={30}
                      alt="points"
                      className="relative"
                    />
                  </div>
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    const token = jwt.sign(
                      { email },
                      process.env.NEXTAUTH_SECRET,
                      {
                        expiresIn: 300,
                      },
                    );

                    const link =
                      'https://rafflr.vercel.app/account/resetPassword?token=' +
                      token;

                    emailjs
                      .send(
                        'service_4i4bini',
                        'template_lta5thu',
                        {
                          link: link,
                          email: email,
                        },
                        'ugD_oGxJEf_4BQ1yN',
                      )
                      .then(
                        (result) => {
                          toast('Reset password email sent successfully!');
                          console.log(result);
                        },
                        (error) => {
                          toast(
                            'There was an error sending the email, please try resetting the password again',
                          );
                          console.log(error);
                        },
                      );

                    // toast('An email has been sent to reset your password!');
                  }}
                  className={cn(
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    {
                      'bg-redc text-white': active,
                      'text-gray-900': !active,
                    },
                  )}
                >
                  Reset password
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={cn(
                    'group flex w-full items-center gap-x-2 rounded-md px-2 py-2 text-sm',
                    {
                      'bg-redc text-white': active,
                      'text-black': !active,
                    },
                  )}
                  onClick={() => router.push('/history')}
                >
                  
                  Raffle history
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={cn(
                    'group flex w-full items-center gap-x-2 rounded-md px-2 py-2 text-sm',
                    {
                      'bg-redc text-white': active,
                      'text-gray-500': !active,
                    },
                  )}
                  onClick={() => signOut()}
                >
                  <LogoutIcon className="h-5 w-5" aria-hidden="true" />
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileMenu;

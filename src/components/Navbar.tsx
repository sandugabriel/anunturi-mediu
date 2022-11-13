import Link from 'next/link';
import React from 'react';
import { UserIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import logo from '../assets/logo_navbar.png';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ProfileMenu from './common/ProfileMenu';
import { useEffect } from 'react';
import { useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/outline';

const Navbar = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (session) {

      fetch('/api/get/points', {
        method: 'POST',
        body: JSON.stringify({
          email: session.user.email,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (res) => {
        const result = await res.json();
        setPoints(result.message.points);
      });
    }
  }, [session]);

  return (
    <header className="ml-20 flex h-auto cursor-pointer flex-col items-center justify-between pt-4 sm:flex-row">
      <div>
        <Image
          onClick={() => router.push('/')}
          className="w-234 h-56 border-r-2 object-none object-left"
          src={logo}
          alt="logo"
        />
      </div>
      <div className="flex w-full items-center justify-around pt-3 md:max-w-2xl md:pt-0">
        <div className="items-left flex flex-grow justify-around md:max-w-xl">
          <Link href="/">
            <span className="text-xs text-navbar-text md:text-sm">Home</span>
          </Link>
          <Link href="/demo">
            <span className="text-xs text-navbar-text md:text-sm">Demo</span>
          </Link>
          <Link href="/pricing">
            <span className="text-xs text-navbar-text md:text-sm">Pricing</span>
          </Link>
          <Link href="/contact">
            <span className="text-xs text-navbar-text md:text-sm">Contact</span>
          </Link>
        </div>
        <div>
          {session ? (
            <div className='flex mr-2'>
              <ProfileMenu
                name={session.user.name}
                email={session.user.email}
                points={points}
              />
              <div className="flow-root mt-2 mr-2">
                <Link
                  href="/checkout"
                  className="group -m-2 flex items-center p-2"
                >
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-redc  group-hover:text-red-700"
                    aria-hidden="true"
                  />
                  {/* <span className="ml-2 text-sm font-medium text-gray group-hover:text-gray-800">
                    {quantity}
                  </span> */}
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex">
              <div
                onClick={() => router.push('/auth/signin')}
                className="mr-3 rounded-full border-2 border-solid border-redc py-0.5 px-7 text-justify text-lg font-bold leading-6 text-redc"
              >
                Sign in
              </div>
              {/* <button onClick={} className="border-solid border-2 border-redc rounded-full text-redc font-bold text-lg text-justify py-0.5 px-7 leading-6 mr-3">Login</button> */}
              <Link href="/profile" passHref>
                <UserIcon className="mb-1 h-5 border-spacing-3 fill-redc " />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

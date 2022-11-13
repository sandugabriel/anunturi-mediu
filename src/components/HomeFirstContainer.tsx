import React from 'react';
import kv from '../assets/kv-31.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const HomeFirstContainer = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="mb-52 flex h-screen w-full flex-col rounded-3xl bg-back-first-home md:mb-5 md:flex-row md:justify-evenly">
      <div className="mb-52 flex flex-col items-center pt-20 md:pl-32 md:pt-40">
        <h2 className="w-11/12 text-center text-6xl text-custom-blue md:text-left">
          The only tool you will need for generating raffles
        </h2>
        {session ? (
          <div className="flex w-2/5 flex-col pt-10 md:w-full md:flex-row">
            <button
              onClick={() => router.push('raffle/')}
              className="mb-3 rounded-full border-2 border-solid border-redc bg-redc py-2 px-7 text-center text-lg leading-6 text-back-first-home md:mr-3 md:mb-0 md:text-justify"
            >
              Create raffle
            </button>
          </div>
        ) : (
          <div className="flex w-2/5 flex-col pt-10 md:w-full md:flex-row">
            <button
              onClick={() => router.push('auth/signup')}
              className="mb-3 rounded-full border-2 border-solid border-redc bg-redc py-2 px-7 text-center text-lg leading-6 text-back-first-home md:mr-3 md:mb-0 md:text-justify"
            >
              Lets get started
            </button>
            <button
              onClick={() => router.push('/demo')}
              className="rounded-full border-2 border-solid border-redc py-2 px-10 text-center text-lg leading-6 text-redc md:ml-5 md:text-justify"
            >
              See Demo
            </button>
          </div>
        )}
      </div>
      <div>
        <div className="flex md:pt-20">
          <Image
            className="order-last mt-24 w-full border-r-2 md:order-none md:h-1/4 md:object-cover md:object-right"
            src={kv}
            alt="kv"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeFirstContainer;

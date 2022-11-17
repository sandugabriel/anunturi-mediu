// import RaffleVideo from "@/components/RaffleVideo";
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const Ad = () => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const router = useRouter();
  const { adId } = router.query;
  console.log(adId);
  useEffect(() => {
    fetch('/api/get/ad', {
      method: 'POST',
      body: JSON.stringify({
        adId: adId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (res) => {
      const result = await res.json();
      console.log(result);
      setText(result.message.text);
      setTitle(result.message.company_name);
    });
  }, []);

  return (

    <section className="body-font text-gray-600">
      <div className="container mx-auto flex flex-col items-center justify-center px-5 py-24">
        <div className="w-full text-center lg:w-2/3">
          <h1 className="title-font mb-4 text-3xl font-medium text-gray-900 sm:text-4xl">
            Anunt de mediu, {title}
          </h1>
          <p className="mb-8 leading-relaxed">
            {text}
          </p>
          <div className="flex justify-center">
            <Link className="inline-flex rounded border-0 bg-teal-500 py-2 px-6 text-lg text-white hover:bg-teal-600 focus:outline-none" href={'/'}>
              Intoarce-te la pagina principala
            </Link>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ad;

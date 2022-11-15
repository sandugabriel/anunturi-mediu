import AdComponent from '@/components/AdComponent';
import Navbar from '@/components/Navbar';

import Head from 'next/head';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    fetch('/api/get/ads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (res) => {
      const result = await res.json();
      console.log(result);
      setAds(result.message);
    });
  }, []);

  const listAds = ads.map((ad, index) => {
    return (
      <AdComponent
        company={ad.company_name}
        text={ad.text}
        date={new Date(ad.createdAt).toString()}
        url={`${process.env.NEXTAUTH_URL}/ads/${ad.id}`}
        key={index}
      />
    );
  });

  return (
    <>
      <Head>
        <title>Anunturi de mediu</title>
        <meta name="description" content="Rafflr Web Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <section className="body-font text-gray-600">
        <div className="container mx-auto px-5 py-24">
          <div className="-m-4 flex flex-wrap">{listAds}</div>
        </div>
      </section>
    </>
  );
};
export default HomePage;

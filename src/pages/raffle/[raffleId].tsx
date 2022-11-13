// import RaffleVideo from "@/components/RaffleVideo";
import Head from 'next/head';
import RaffleForm from '@/components/RaffleForm';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Raffle = () => {
  //   const files = useMy() as any;
  const [component, setComponent] = useState(null);
  const router = useRouter();
  const { raffleId } = router.query;
  console.log(raffleId);
  useEffect(() => {
    fetch('/api/get/raffle', {
      method: 'POST',
      body: JSON.stringify({
        raffleId: raffleId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (res) => {
      const result = await res.json();
      console.log(result);
      const DynamicVideo = dynamic(
        () => import('../../components/RaffleVideo'),
        {
          ssr: false,
        },
      );
      let prize_photos = [];
      let prize_names = [];
      let prize_numbers = [];
      result.message.prizePhotos.forEach((photo) => {
        prize_photos.push(photo.url);
        prize_names.push(photo.name);
        prize_numbers.push(photo.number);
      });
      const files = {
        name: result.message.name,
        info: result.message.info,
        csv: result.message.csv.url,
        kv: result.message.kv.url,
        prize_photos: prize_photos,
        prize_names: prize_names,
        prize_numbers: prize_numbers,
      };
      setComponent(<DynamicVideo files={files} id={raffleId as any} />);
    });
  }, []);


  return (
    <div className="flex flex-col items-center overflow-clip">
      <Head>
        <title>Rafflr</title>
        <meta name="description" content="Rafflr Web App" />
      </Head>
      {component}
    </div>
  );
};

export default Raffle;

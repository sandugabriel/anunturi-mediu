import HistoryDraft from '@/components/HistoryDraft';
import HistoryItem from '@/components/HistoryItem';
import Navbar from '@/components/Navbar';
import Unauthorized from '@/components/Unauthorized';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const History = () => {
  const { data: session, status } = useSession();
  const [raffleDrafts, setRaffleDrafts] = useState([]);

  useEffect(() => {
    fetch('/api/get/raffles', {
      method: 'POST',
      body: JSON.stringify({
        email: session.user.email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (res) => {
      const result = await res.json();
      // console.log(result);
      setRaffleDrafts(result.message);
    });
  }, []);

  if (status === 'unauthenticated') {
    return (
      <div>
        <Unauthorized />
      </div>
    );
  } else {
    const listDrafts = raffleDrafts.map((raffle, index) => {
      if (raffle.draft) {
        return (
          <HistoryDraft
            name={raffle.name}
            id={raffle.id}
            date={new Date(raffle.createdAt).toString()}
            key={index}
          />
        );
      }
    });
    const listVideos = raffleDrafts.map((raffle, index) => {
      if (!raffle.draft) {
        return (
          <HistoryItem
            name={raffle.name}
            url={raffle.url}
            date={new Date(raffle.createdAt).toString()}
            key={index}
          />
        );
      }
    });
    // const listHistory = raffleData.map((raffle, index) => <HistoryItem name={raffle.name} date="19/10/2022" key={index} />)

    return (
      <div className="flex w-full flex-col justify-between">
        <Navbar />
        <div className="my-10 ml-20 flex w-1/2 flex-col">
          <span className="text-lg font-bold">Account history</span>
          <span>
            Here you can see your past raffles, download the videos for them,
            some more info should go here. We will keep the videos on our
            servers only for 30 days, after that you won’t be able to downlaod
            them anymore.
          </span>
        </div>
        <div className="ml-20 flex w-1/2 flex-col">
          <span className="mb-3 text-lg font-bold">Drafts</span>
          <div className="flex flex-col justify-around">{listDrafts}</div>
        </div>
        <div className="ml-20 flex w-1/2 flex-col">
          <span className="text-lg font-bold">Past raffles</span>
          {listVideos}
        </div>
      </div>
    );
  }
};

export default History;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
};

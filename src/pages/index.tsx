import FadeUp from '@/components/FadeUp';
import HomeFirstContainer from '@/components/HomeFirstContainer';
import HomeSecondContainer from '@/components/HomeSecondContainer';
import HomeThirdContainer from '@/components/HomeThirdContainer';
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

const HomePage = () => {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Rafflr</title>
        <meta name="description" content="Rafflr Web Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <Navbar />

        {session ? (
          <div className="flex flex-col">
            <FadeUp>
              <HomeFirstContainer />
            </FadeUp>
            <FadeUp>
              <HomeSecondContainer />
            </FadeUp>
            <FadeUp>
              <HomeThirdContainer />
            </FadeUp>
          </div>
        ) : (
          <div className="flex flex-col">
            <FadeUp>
              <HomeFirstContainer />
            </FadeUp>
            <FadeUp>
              <HomeSecondContainer />
            </FadeUp>
            <FadeUp>
              <HomeThirdContainer />
            </FadeUp>
          </div>
        )}
      </div>
    </>
  );
};
export default HomePage;

import '../styles/globals.css';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { MyContextProvider } from '../../MyContext';
import NextNProgress from 'nextjs-progressbar';
import { Session } from 'next-auth';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <>
    <RecoilRoot>
    <NextNProgress height={20} stopDelayMs={100}/>
    <SessionProvider session={pageProps.session}>
      <MyContextProvider>
        <Component {...pageProps} />
      </MyContextProvider>
    </SessionProvider>
    </RecoilRoot>
    
    </>
    
  );
}

export default MyApp;

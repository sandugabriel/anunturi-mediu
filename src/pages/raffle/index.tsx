// import RaffleVideo from "@/components/RaffleVideo";
import { useMy } from "MyContext";
import Head from 'next/head';
import RaffleForm from "../../components/RaffleForm";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Raffle = () => {
  
  const files = useMy() as any;
  const [component, setComponent] = useState(null)
  
  useEffect(() => {
    if (files) {
      const DynamicVideo = dynamic(() => import('../../components/RaffleVideo'), {
        ssr: false,
      })
      setComponent(<DynamicVideo files={files} id={files.raffleId}/>);
    }
    else {
      setComponent(<RaffleForm />);
    }
  }, [files])

  return(
    <div className="flex flex-col items-center overflow-clip">
          <Head>
            <title>Rafflr</title>
            <meta name="description" content="Rafflr Web App" />
          </Head>
          {component}
        </div>
    )
};



export default Raffle;

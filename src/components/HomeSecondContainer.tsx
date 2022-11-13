import React from 'react';
// import kv from '../assets/kv-31.png';
import Image from 'next/image';
import arrow from '../assets/Arrow.png';

const HomeSecondContainer = () => {
  return (
    <div className="flex h-screen w-full flex-col justify-evenly rounded-3xl bg-yellow">
      <div className="flex flex-col items-center pt-20 md:w-1/2 md:items-start md:pl-32 md:pt-5">
        <h2 className="pt-10 text-6xl font-bold leading-10">How it works</h2>
        <h4 className="pt-10 text-2xl font-normal leading-6">
          Rafflr - is a web generator, raffle, dedicated to brand campaigns,
          which aim to extract a fixed number of winners. The site is intended
          only for the desktop, as a tool that can be used at the end of
          campaigns.
        </h4>
        <h5 className="pt-5 text-xl italic leading-6">
          what you can do with this tool(short version)
        </h5>

        <div className="flex pt-2">
          <h4 className="font-bold">Create campaign</h4>
          <Image
            className="object-none object-center"
            src={arrow}
            alt="arrow"
          />
          <h4 className="font-bold">Generate raffle</h4>
          <Image
            className="object-none object-center"
            src={arrow}
            alt="arrow"
          />
          <h4 className="font-bold">Announce winners</h4>
        </div>
      </div>
    </div>
  );
};

export default HomeSecondContainer;

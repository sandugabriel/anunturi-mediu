import React from 'react';

const HomeThirdContainer = () => {
  return (
    <div className="mt-5 flex h-screen w-full flex-col justify-evenly rounded-3xl bg-gray-second">
      <div className="mb-10 flex w-1/2 flex-col justify-evenly pl-32">
        <h2 className="pt-10 text-6xl font-bold leading-10">Features</h2>
        <ul className="list-disc pt-10 text-2xl leading-6">
          <li>Payment</li>
          <li>Video recording & download & publish to youtube</li>
          <li>Email sending</li>
          <li>Social media comments gathering.</li>
          <li>Ghost winners (backup winners)</li>
          <li>Raffle page - campaign customization</li>
        </ul>
        <div className="flex pt-5">
          <button className="mr-3 rounded-full border-2 border-solid border-redc bg-redc py-2 px-7 text-justify text-lg leading-6 text-back-first-home">
            Lets get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeThirdContainer;

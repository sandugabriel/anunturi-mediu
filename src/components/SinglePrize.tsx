import React from 'react';
import Image from 'next/image';

const SinglePrize = ({ image, name, number, alreadyDone, highlighted }) => {
  let state = ''
  if (highlighted) {
    state = ' opacity-100'
  } else {
    state = ' opacity-30'
  }
  return (
    <div className={'flex flex-col items-center bg-slate-100 py-5 px-10 rounded-xl' + state}>
        <Image src={image} alt="photo" width={40} height={40} />
        <h2>{name}</h2>
        <h2>{alreadyDone}/{number}</h2>
    </div>
  );
};

export default SinglePrize;

import Link from 'next/link';
import React from 'react';

const HistoryItem = ({ name, date, url }) => {
  
  return (
    <div className='flex flex-col'>
        <span>{date}    -    {name}</span>
        <Link href={url} >
          <span className='text-blue-600'>Download video</span>
        </Link>
        
    </div>
  );
};

export default HistoryItem;
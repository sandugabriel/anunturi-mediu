import Link from 'next/link';
import React from 'react';

const AdItem = ({ company, text, date, url }) => {

  const convertToShortText = (text) => {
    const words = text.split(" ");
    return words.slice(0, 20).join(" ");
  }
  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60">
        <div className="p-6">
          <h2 className="title-font mb-1 text-xs font-medium tracking-widest text-gray-400">
            {company}
          </h2>
          <h1 className="title-font mb-3 text-lg font-medium text-gray-900">
            Anunt de mediu
          </h1>
          <p className="mb-3 leading-relaxed">
            {convertToShortText(text)} ...
          </p>
          <div className="flex flex-wrap items-center ">
            <Link className="inline-flex items-center text-indigo-500 md:mb-2 lg:mb-0" href={url}>
              Citeste mai mult
              <svg
                className="ml-2 h-4 w-4"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1  border-gray-200">
                {date.slice(0,15)}
              </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdItem;

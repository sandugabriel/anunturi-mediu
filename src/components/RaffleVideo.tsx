import { useRouter } from 'next/router';
import Papa from 'papaparse';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

import Table from '@/components/Table';
import { useUpdate } from 'MyContext';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import PrizeComponent from './PrizeComponent';

interface Props {
  files: any;
  id?: string;
}
const readUpload = async (blobURL, id) => {
  const cloud_url = 'https://api.cloudinary.com/v1_1/ordo-et-chao/video/upload';
  let blob = await fetch(blobURL).then((r) => r.blob());
  var reader = new window.FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = async function () {
    let base64data = reader.result;
    fetch(cloud_url, {
      method: 'POST',
      body: JSON.stringify({
        file: base64data,
        upload_preset: 'test_preset',
        resource_type: 'video',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (res) => {
      const result = await res.json();
      fetch('/api/update/raffleurl', {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          url: result.secure_url,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (res) => {
        const result = await res.json();
        console.log(result.message);
      });
    });
  };
};

const RaffleVideo = ({ files, id = '' }: Props) => {
  const [kv, setKv] = useState(null);
  const [winnerIds, setWinnerIds] = useState([]);
  const [currWinner, setCurrWinner] = useState(99999);
  const [finished, setFinished] = useState(false);
  const [object, setObject] = useState([]);
  const [currentPrize, setCurrentPrize] = useState(0);
  const firstTimeRender = useRef(true);
  const firstTimeRecording = useRef(true);
  const { data: session } = useSession();
  const router = useRouter();
  const [blob, setBlob] = useState('');
  const updateCont = useUpdate();

  const {
    status,
    startRecording: startRecord,
    stopRecording: stopRecord,
    mediaBlobUrl,
  } = useReactMediaRecorder({ screen: true, audio: false });

  const startRecording = () => {
    return startRecord();
  };

  const stopRecording = () => {
    setTimeout(stopRecord, 2000);
    return true;
  };

  const stopRecordingOnBack = () => {
    stopRecord();
    return true;
  };

  const chooseRandomRow = async () => {
    let rowsIndexes = Array.from(files.csv.keys());
    let constWinnerIds = winnerIds;
    let current = currWinner;
    let constPrizeObject = object;

    const newLocal = true;
    while (newLocal) {
      let randomIndex = Math.floor(Math.random() * rowsIndexes.length);
      if (!constWinnerIds.includes(randomIndex)) {
        constWinnerIds.push(randomIndex);
        setCurrWinner(randomIndex);
        break;
      }
    }
    setWinnerIds(constWinnerIds);
    constPrizeObject[currentPrize].alreadyDone =
      constPrizeObject[currentPrize].alreadyDone + 1;

    setObject(constPrizeObject);
    return current;
  };

  useEffect(() => {
    let constPrizeObject = object;
    if (!firstTimeRender.current) {
      const elem = document.getElementById('human_' + currWinner.toString());
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // console.log(object.length);
      if (
        object[currentPrize].alreadyDone === object[currentPrize].number &&
        currentPrize + 1 < object.length
      ) {
        constPrizeObject[currentPrize + 1].highlighted = true;
        setObject(constPrizeObject);
        setCurrentPrize(currentPrize + 1);
      }
    } else {
      firstTimeRender.current = false;
    }
  }, [currWinner]);

  useEffect(() => {
    if (status === 'stopped') {
      alert('Raffle over!');
      setFinished(true);
      setBlob(mediaBlobUrl);

      readUpload(mediaBlobUrl, id);
    }
  }, [status, currentPrize]);

  useEffect(() => {
    if (firstTimeRecording) {
      startRecording();
    } else {
      firstTimeRecording.current = false;
    }
  }, [firstTimeRecording]);

  const experiment = React.useMemo(
    () => [
      {
        Header: 'Raffle',
        columns: files.columns,
      },
    ],
    [],
  );

  const getProps = () => {
    let prize_names = [];
    let imgs = [];
    let prize_numbers = [];
    let obj_list = [];

    Array.from(files.prize_photos).forEach((photo, index) => {
      let obj = {};
      obj['photo'] = photo;
      obj['name'] = files.prize_names[index];
      obj['number'] = parseInt(files.prize_numbers[index]);
      obj['alreadyDone'] = 0;
      if (index === 0) {
        obj['highlighted'] = true;
      } else {
        obj['highlighted'] = false;
      }
      obj_list.push(obj);
    });
    setObject(obj_list);

    files.prize_names.forEach((name) => {
      prize_names.push(<h2>{name}</h2>);
    });
    files.prize_numbers.forEach((number) => {
      prize_numbers.push(<h2>0/{number}</h2>);
    });
    Array.from(files.prize_photos).forEach((photo) => {
      imgs.push(
        <Image src={photo as any} alt="photo" width={60} height={60} />,
      );
    });
    // readCSV();
    setKv(<Image src={files.kv} alt="photo" width={1920} height={509} />);
  };

  useEffect(() => {
    getProps();
  }, [files.csv]);

  useEffect(() => {
    if (finished) {
      try {
        fetch('/api/update/points', {
          method: 'POST',
          body: JSON.stringify({
            email: session.user.email,
            type: 'decrement',
            value: 1,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => console.log(res));
      } catch (error) {
        // console.log(error);
      }
    }
  }, [finished]);

  useEffect(() => {
    if (finished && id !== '') {
      try {
        fetch('/api/update/draft', {
          method: 'POST',
          body: JSON.stringify({
            id: id,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => console.log(res));
      } catch (error) {
        // console.log(error);
      }
    }
  }, [finished]);

  const downloadVideo = (url: string) => {
    const link = document.createElement('a');
    const currentTime = new Date();
    const filename = currentTime.toString() + '.mp4';
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };
  return (
    <>
      {!finished ? (
        <>
          <div className="flex rounded-2xl">{kv}</div>
          <div className="flex w-full">
            <Table columns={experiment} data={files.csv} winners={winnerIds} />
          </div>

          <div className="relative z-50 -mt-[400px] flex h-3/5 w-full justify-evenly md:w-3/5 lg:w-1/3">
            <button
              onClick={() => {
                updateCont(null);
                stopRecordingOnBack();
              }}
              className="text-blue-500"
            >
              Go back
            </button>
            <button
              onClick={() => chooseRandomRow()}
              className="mb-3 rounded-full border-2 border-solid border-redc bg-redc py-2 px-5 text-center text-base leading-6 text-back-first-home hover:bg-red-900 md:mr-3 md:mb-0 md:text-justify"
            >
              RAAAAAAFLEEE !
            </button>
            <button
              onClick={() => {
                stopRecording();
              }}
              className="text-blue-500"
            >
              End recording
            </button>
          </div>
          <PrizeComponent prizes={object as any} />
        </>
      ) : (
        <div>
          {/* <Navbar /> */}
          <div className="flex flex-col items-center justify-center">
            <video
              src={blob}
              className="mt-10 border shadow-lg"
              width={480}
              height={640}
              autoPlay
              // loop
              controls
            />
            <div className="flex w-4/5 justify-between p-2">
              <button
                className="rounded-full border-2 border-solid border-redc py-0.5 px-2 text-justify text-lg font-bold leading-6 text-redc"
                onClick={() => {
                  updateCont(null);
                  downloadVideo(blob);
                }}
              >
                Download
              </button>
              <button
                className="rounded-full border-2 border-solid border-redc py-0.5 px-2 text-justify text-lg font-bold leading-6 text-redc"
                onClick={() => {
                  updateCont(null);
                  router.push('/');
                }}
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RaffleVideo;

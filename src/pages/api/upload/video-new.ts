import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../../utils/cloudinary';

async function toDataURL_node(url) {
  let response = await fetch(url);
  let blob = await response.blob();
  let buffer = Buffer.from(await blob.text());
  return 'data:' + blob.type + ';base64,' + buffer.toString('base64');
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { video, id } = req.body;

    if (video) {
      console.log(video);
      try {
        const b64 = await toDataURL_node(video);
				console.log(b64)
        await cloudinary.uploader.upload(
          b64 as string,
          { upload_preset: 'test_preset', resource_type: 'video' },
          (error: any, result: any) => {
            if (error) {
              console.log(error);
              return res.status(422).json({ message: error });
            }
            console.log(result);
            res.status(200).json({ message: result });
          },
        );
      } catch (error) {
        res.status(500).json({ message: error });
      }
    } else {
      res.status(500).json('Video blob not present in the request!');
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed!`);
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Set desired value here
    },
  },
};

export default handler;

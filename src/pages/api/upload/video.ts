import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../../utils/cloudinary';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { video } = req.body;
    console.log(video)
    if (video) {
      
      await cloudinary.uploader.upload_chunked(
        video,
        { upload_preset: 'test_preset', resource_type: 'video' },
        (error: any, result: any) => {
          if (error) {
            console.log(error)
            return res.status(422).json({ message: error });
          }
          console.log(result)
          return res.status(200).json({ message: result });
        },
      );
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '100mb' // Set desired value here
      }
  }
}

export default handler;

import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../../utils/cloudinary';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { prize_photo } = req.body;
    if (prize_photo) {
      await cloudinary.uploader.upload(
        prize_photo,
        { upload_preset: 'test_preset' },
        (error: any, result: any) => {
          if (error) {
            return res.status(422).json({ message: error });
          }
          return res.status(200).json({ message: result });
        },
      );

      
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

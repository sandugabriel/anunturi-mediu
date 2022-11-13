import emailjs from 'emailjs-com';
import { NextApiRequest, NextApiResponse } from 'next';
import isEmail from 'validator/lib/isEmail';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, link }: { email: string; link: string } = req.body;

    if (!isEmail(email)) {
      return res.status(422).json({ message: 'Invalid input!' });
    }
      emailjs.send('service_4i4bini', 'template_6v0r7jk', 
        {
            link: link,
            reply_to: email
        })
    .then((result) => {
          return res.status(200).json({message : result})
      }, 
       (error) => {
          return res.status(401).json({message: error})
       });
  }else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

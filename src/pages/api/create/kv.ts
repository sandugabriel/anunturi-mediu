import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { raffleId, url } : {raffleId: string, url: string} = req.body;
    
    try {
        const kv = await prisma.kv.create({
            data: {
                url: url,
                raffle: {connect: {id: raffleId}},
            }
        })

        return res.status(200).json({ message:  kv});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error });
    }
  }else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
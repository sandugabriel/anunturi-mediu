import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { id } = req.body;
    try {
      const raffle = await prisma.raffle.update({
        where: {
          id: id
        },
        data: {
          draft: false
        }
      })

      return res.status(200).json({ message: raffle });
    } catch (error) {
      return res.status(422).json({ message: error });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
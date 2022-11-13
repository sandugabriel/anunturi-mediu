import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';

type Raffle = {
  name: string;
  info: string;
  csv: string;
  kv: string;
  prize_photos: string[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { raffleId } = req.body;
    console.log(raffleId)

    try {
      const raffle = await prisma.raffle.findUnique({
        where: {
          id: raffleId,
        },
        select: {
          name: true,
          info: true,
          csv: {
            select: {
              url: true,
            },
          },
          kv: {
            select: {
              url: true,
            },
          },
          prizePhotos: {
            select: {
              url: true,
              name: true,
              number: true
            },
          },
        },
      });
      return res.status(200).json({ message: raffle });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

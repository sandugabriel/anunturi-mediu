import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {
      raffleId,
      url,
      name,
      number,
    }: { raffleId: string; url: string; name: string; number: string } =
      req.body;
    try {
      const prize = await prisma.prize.create({
        data: {
          url: url,
          raffle: { connect: { id: raffleId } },
          name: name,
          number: number,
        },
      });

      return res.status(200).json({ message: prize });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

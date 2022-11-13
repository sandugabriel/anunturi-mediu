import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    
    const { email } = req.body;

    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
        select: {
          points: true,
          },
      });

      return res.status(200).json({ message: user });
    } catch (error) {
      return res.status(422).json({ message: error });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

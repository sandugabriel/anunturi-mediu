import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, type, value } = req.body;
    if (type === 'increment') {
        try {
            const user = await prisma.user.update({
              where: {
                email: email,
              },
              data: {
                points: {
                  increment: value,
                },
              },
            });
      
            return res.status(200).json({ message: user });
          } catch (error) {
            return res.status(422).json({ message: error });
          }
    } else {
        try {
            const user = await prisma.user.update({
              where: {
                email: email,
              },
              data: {
                points: {
                  decrement: value,
                },
              },
            });
      
            return res.status(200).json({ message: user });
          } catch (error) {
            return res.status(500).json({ message: error });
          }
    }
    
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

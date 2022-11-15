import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const ads = await prisma.advertisment.findMany({
        where: { isPaid: true },
        select: {
          id: true,
          name: true,
          company_name: true,
          text: true,
          createdAt: true,
        },
      });
      console.log(ads)
      return res.status(200).json({ message: ads });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

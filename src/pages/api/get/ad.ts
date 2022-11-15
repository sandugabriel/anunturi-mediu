import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { adId } = req.body;
    console.log(adId);

    try {
      const ad = await prisma.advertisment.findUnique({
        where: {
          id: adId,
        },
        select: {
          company_name: true,
          text: true,
        },
      });
      return res.status(200).json({ message: ad });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

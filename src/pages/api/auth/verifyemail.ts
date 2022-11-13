import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email }: { email: string } = req.body;
    try {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          emailVerified: new Date(),
        },
      });
      return res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

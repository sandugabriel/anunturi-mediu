import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/argon2';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password }: { email: string, password: string } = req.body;
    const hashedPassword = await hashPassword(password)
    try {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          password: hashedPassword,
        },
      });
      return res.status(200).json({ message: 'Password updated successfully!' });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

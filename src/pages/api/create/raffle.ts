import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, description, draft, email } : {name: string, description: string, draft: boolean, email: string} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where : {
                email: email
            }
        })

        const raffle = await prisma.raffle.create({
            data: {
                name: name,
                info: description,
                draft: draft,
                user: {connect: {id: user.id}}
            }
        })

        return res.status(200).json({ message: raffle});
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

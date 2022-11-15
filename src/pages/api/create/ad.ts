import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {text, name, company_name, email, address, price}: {text: string, name: string, company_name: string, email: string, address: string, price: any} = req.body;
    try {
        const ad = await prisma.advertisment.create({
            data: {
                text: text,
                name: name,
                company_name: company_name,
                email: email,
                address: address,
                price: price,
                isPaid: false
            }
        })

        return res.status(200).json({ message:  ad});
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

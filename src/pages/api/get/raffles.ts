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
    const { email } = req.body;

    // console.log(email)

    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });

    console.log(existingUser)

    if (existingUser) {
      try {
        const userId = existingUser.id;
        const raffles = await prisma.raffle.findMany({
          where: { userId: userId },
          select: {
            id: true,
            name: true,
            info: true,
            createdAt: true,
            draft: true,
            url: true,
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
					url: true
				}
			}
          },
        });
		return res.status(200).json({ message: raffles });

        // let rafflesLst = [];

        // raffles.forEach(async (raffleObj, index) => {
        //   let raffle = {} as Raffle;
        //   console.log('Raffle ', index);
        //   await prisma.csv
        //     .findUnique({
        //       where: { raffleId: raffleObj.id },
        //     })
        //     .then(async (csv) => {
        //     //   console.log('Csv ', csv);
        //       raffle.csv = csv.url;
        //       await prisma.kv
        //         .findUnique({
        //           where: { raffleId: raffleObj.id },
        //         })
        //         .then(async (kv) => {
        //           raffle.kv = kv.url;
        //         //   console.log('Kv', kv);
        //           await prisma.prize
        //             .findMany({
        //               where: { raffleId: raffleObj.id },
        //             })
        //             .then((prize_photos) => {
        //               let prizes = [];
        //               prize_photos.forEach((prize) => {
        //                 prizes.push(prize.url);
        //               });
        //               raffle.prize_photos = prizes;
        // 			  rafflesLst.push(raffle);

        //             });
        //         });
        //     });

        // });l
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    } else {
      res.status(500).json({ message: "User not found" })
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

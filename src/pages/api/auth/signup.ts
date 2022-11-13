import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import isEmail from 'validator/lib/isEmail';

import { hashPassword } from '@/lib/argon2';
import prisma from '@/lib/prisma';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {
      firstName,
      lastName,
      email,
      password,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    } = req.body;

    if (!isEmail(email) || password.trim().length < 7) {
      return res.status(422).json({ message: 'Invalid input!' });
    }

    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(403).json({ message: 'Email already exists!' })
    }

    // TODO: check if email already in db

    const hashedPassword = await hashPassword(password);

    // JWT email verification

    const newUser: Prisma.UserCreateInput = {
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    };

    try {
      
      const user = await prisma.user.create({ data: newUser });
      res.status(201).json({
        message: 'Created user!',
        data: user,
      });
    } catch (error) {
      console.log(error)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.code)
        if (error.code === 'P2002') {
          return res
            .status(422)
            .json({ message: 'User is already registered.' });
        }
        return res.status(500).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal Server Error!!!!' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

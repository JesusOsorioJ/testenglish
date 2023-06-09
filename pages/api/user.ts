// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient, Prisma, User } from '@prisma/client';
const prisma = new PrismaClient()

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const user: Prisma.UserCreateInput = JSON.parse(req.body);

  switch (req.query.type) {

    case 'login':
      try {
        const response = await prisma.user.findMany({
          where: {
            email: user.email,
            password: user.password
          },
        })
        return res.status(200).json({ message: response });
      } catch (err) {
        return res.status(400).json({ message: 'Something went wrong' });
      }
    case 'signup':
      try {
        const findEmail = await prisma.user.findMany({
          where: {
            email: JSON.parse(req.body).email,
          },
        })

        if (findEmail.length > 0) { throw new Error("The user already exist") }
        const user: Prisma.UserCreateInput = JSON.parse(req.body);
        const response = await prisma.user.create({
          data: user,
        })

        return res.status(200).json({ message: response });
      } catch (err) {
        return res.status(400).json({ message: err + "" });
      }

    case 'update':
      try {
        const response = await prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            answer: JSON.stringify(user.answer),
            lastAnswer: user.lastAnswer
          },
        })

        return res.status(200).json({ message: response });
      } catch (err) {
        return res.status(400).json({ message: 'Something went wrong' });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }



}

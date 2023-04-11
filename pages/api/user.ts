// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient, Prisma, User } from '@prisma/client';
const prisma = new PrismaClient()

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  
  // if (req.method !== 'POST') {
  //   return res.status(405).json({ message: 'Method not allowed' });
  // }

  try {
    // console.log("req.body.email",JSON.parse(req.body));
    
    // const user: Prisma.UserCreateInput = JSON.parse(req.body);
    const ress = await prisma.user.findUnique({
      where: {
        email:JSON.parse(req.body).email,
      },
    })
    res.status(200).json({ message: ress });
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}

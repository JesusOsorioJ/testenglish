// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient} from '@prisma/client';
const prisma = new PrismaClient()

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const word = JSON.parse(req.body);
  
  if (req.method == 'POST') {
   
    try {
     if (word.selectType==null){
      const response = await prisma.word.findMany()
      res.status(200).json({ message: response });
     }else{
      const response = await prisma.word.findMany({where: {
      type: {
           equals: word.selectType
        },
      }})
      res.status(200).json({ message: response });
     } 
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  }else{
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

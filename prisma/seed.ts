import { PrismaClient } from "@prisma/client";
import { data } from './data'
const prisma = new PrismaClient();


async function main() {
 await prisma.word.createMany({
    data
 })
}

main()
    .catch((e) => {
        console.log(e);
        process.exit
    }).finally(() => {
        prisma.$disconnect();
    })
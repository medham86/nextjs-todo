
import { faker } from '@faker-js/faker';




import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
//   await prisma.user.createMany({
//    data: Array.from({ length: 25 }, () => {
//     return  {
//       name:faker.internet.username(),
//       email: faker.internet.email()
//     }
//   })
// })

// await prisma.todo.createMany({
//   data: Array.from({ length: 25 }, () => {
//     return {
//       title: faker.lorem.words({min:2 , max:5}),
//       body: faker.lorem.words({min:5 , max : 20}),
//       completed: faker.datatype.boolean(),
     
//     }
//   })
// })



}


main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

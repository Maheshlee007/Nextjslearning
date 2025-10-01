
import { NextRequest } from 'next/server';
import prisma from '@/db';
import signupAction from '@/app/actions/signup';


// prisma.$on('query', (e) => {
//   console.log('Query:', e.query);
//   console.log('Params:', e.params);
//   console.log('Duration:', e.duration, 'ms');
// });

export async function POST(req: NextRequest) {
   const data =await signupAction(req);
   console.log("route data",data);
    return Response.json(data);
  // return Response.json({ message: `User ${user.username} registered successfully` }, { status: 200 });
}

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

export async function GET(req: NextRequest) {
  const users = await prisma.users.findMany();
  return Response.json(users);
}
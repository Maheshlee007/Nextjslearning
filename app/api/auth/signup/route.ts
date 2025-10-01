
import { NextRequest } from 'next/server';
import prisma from '@/db';


// prisma.$on('query', (e) => {
//   console.log('Query:', e.query);
//   console.log('Params:', e.params);
//   console.log('Duration:', e.duration, 'ms');
// });

export async function POST(req:NextRequest) {
  
  const body = await req.json();
  const {username, password,email, firstname, lastname} = body;
  console.log("body",body);
  
  if (!username || !password || !email || !firstname) {
    return  Response.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const userExists = await prisma.users.findUnique({
    where: { username }
  });
   console.log("userExists",userExists);
  if (userExists) {
    return  Response.json({ error: 'Username already exists' }, { status: 409 });
  }
  

  // console.log("bfy",body);

  const user = await prisma.users.create({
    data: {
      username,
      password,      
      user_details: {
        create: {
          firstname,
          lastname,
          email,
        }
      }
    }, select: { id: true, username: true }
  })
    
  return Response.json({ message: `User ${user.username} registered successfully` }, { status: 200 });
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
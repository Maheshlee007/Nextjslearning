import { PrismaClient } from '@/app/generated/prisma'
import { NextRequest } from 'next/server';


const prisma = new PrismaClient()

export async function GET(req:NextRequest) {
  const body = await req.json();
  const {username, password, name, email, firstname, lastname} = body;

  if (!username || !password || !name || !email || !firstname) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  console.log("bfy",body);
  
//   prisma.users.create({
//     data: {}
//   )
      
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
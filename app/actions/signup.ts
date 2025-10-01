"use server"
import { NextRequest } from 'next/server';
import prisma from '@/db';
// import { Prisma } from '../generated/prisma';
// lib/prisma.ts
// import { PrismaClient } from '@/app/generated/prisma'

export default async function signupAction(req?: NextRequest, userdata?:any) {
  const body = await req?.json() || userdata;
  const { username, password, email, firstname, lastname } = body;
  console.log("body", body);

  if (!username || !password || !email || !firstname) {
    return  { error: 'Missing required fields' };
    // Response.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const userExists = await prisma.users.findUnique({
    where: { username}
  });
   console.log("userExists",userExists);
  if (userExists) {
    return  { error: 'Username already exists' }
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
    console.log("user",user);
    if(user.username){
        return { message: `User ${user.username} registered successfully` , user}
    }
    // return user;
}
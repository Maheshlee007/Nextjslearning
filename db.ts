// lib/prisma.ts
import { PrismaClient } from '@/app/generated/prisma'

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
 console.log("DB initializing...");

 const prismaClientSingleton = () => {
 console.log("Creating new PrismaClient instance");

//  const short:(Prisma.LogLevel | Prisma.LogDefinition)[]= {all: ['query', 'info', 'warn', 'error'],query:['query']}
//  const customlogging = {log: [{ emit: 'event', level: 'query' }]}

  // return new PrismaClient({log:['query']});
  return new PrismaClient();
}  

function createPrismaClient() {
  const client = new PrismaClient();
  // Register the event handler only once, when the client is created
//   client.$on('query', (e:any) => {
//     console.log('Query:', e.query);
//     console.log('Duration:', e.duration, 'ms');
//   });
  return client;
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
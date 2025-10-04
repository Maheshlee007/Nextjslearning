import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

let requestCount = 0;
export function middleware(request: NextRequest) {
    if(request.nextUrl.pathname.startsWith('/api/auth') || request.nextUrl.pathname.startsWith('/signin') ){
        // console.log("Middleware executing for ", request.nextUrl);
        requestCount++;
        // return NextResponse.next();
        // console.log("number of requests is " + requestCount);
    }
  return  NextResponse.next()
}
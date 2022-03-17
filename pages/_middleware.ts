import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextApiRequest, NextApiResponse } from 'next'

// interface Request extends NextApiRequest {
//   nextUrl: any
// }

export default async function checkAuthTokenMiddleware(req: Request) {
  const secret = process.env.JWT_SECRET || ''
  // if token exist in request, user is logged in
  // const token = await getToken({ req, secret })
  // const userWantAuth = req.nextUrl.pathname.includes('/api/auth')

  // allow requests if the following true
  // 1) User want to log in
  // 2) User already logged in / has token

  // if (token || userWantAuth) {
  //   return NextResponse.next()
  // }

  // otherwise redirect user to default page if NO token AND...
  // ... user want to access protected route

  // if (!token && req.nextUrl.pathname !== '/login') {
  //   return NextResponse.redirect(new URL('/login', req.nextUrl))
  // }
}

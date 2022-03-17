import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const checkAuthTokenMiddleware = async (req) => {
  const secret = process.env.JWT_SECRET
  // if token exist in request, user is authenticated
  const token = await getToken({ req, secret })
  const { pathname } = req.nextUrl

  // allow requests if the following true
  // 1) User want to log in
  // 2) User already logged in / has token

  if (token || pathname.includes('/api/auth')) {
    return NextResponse.next()
  }

  // otherwise redirect user to default page if NO token AND...
  // ... user want to access protected route

  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login')
  }
}

export default checkAuthTokenMiddleware

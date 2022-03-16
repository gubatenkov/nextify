import NextAuth, { DefaultSession } from 'next-auth'

import { IUser } from '../interfacesAndTypes'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IUser & DefaultSession['user']
    error?: string
  }
}

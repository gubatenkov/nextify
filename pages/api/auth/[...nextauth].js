import NextAuth from 'next-auth'
import DefaultProvider from 'next-auth/providers/spotify'
import { LOGIN_URL, spotApi } from '../../../services/spotify'

const providerData = {
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID || '',
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || '',
  authorization: LOGIN_URL,
}
const refreshAccessToken = async (token) => {
  try {
    spotApi.setAccessToken(token.accessToken)
    spotApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotApi.refreshAccessToken()

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    }
  } catch (err) {
    console.log(err)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    DefaultProvider(providerData),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
        }
      }

      // return pervious token if the token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, try to update it
      return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.accessToken = token.accessToken
      session.error = token.error

      return session
    },
  },
})

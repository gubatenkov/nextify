import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { OAuthUserConfig } from 'next-auth/providers'
import DefaultProvider from 'next-auth/providers/spotify'
import { LOGIN_URL, spotApi } from '../../../services/spotify'

interface IProviderConfig {
  clientId: string
  clientSecret: string
  authorization: string
}

const providerData: OAuthUserConfig<IProviderConfig> = {
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
  authorization: LOGIN_URL as string,
}
const refreshAccessToken = async (token: JWT) => {
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
          accessTokenExpires: Date.now() + Number(account.expires_in) * 1000,
        }
      }

      // return pervious token if the token has not expired yet
      if (Date.now() < Number(token.accessTokenExpires)) {
        return token
      }

      // Access token has expired, try to update it
      return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string
      session.accessToken = token.accessToken as string
      session.error = token.error as string

      return session
    },
  },
})

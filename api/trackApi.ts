import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { ITrack, IUser, TRootState } from '../interfacesAndTypes'

interface IPlayingTrackResult {
  item: ITrack
  is_playing: boolean
}

export const trackApi = createApi({
  reducerPath: 'trackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spotify.com/v1',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as TRootState
      const user = state.user as unknown as IUser
      if (user) {
        headers.set('Authorization', `Bearer ${user.accessToken}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getPlayingTrack: builder.query<IPlayingTrackResult, void>({
      query: () => ({
        url: '/me/player/currently-playing',
        method: 'GET',
      }),
      //   transformResponse: (
      //     rawResult: { item: ITrack; is_playing: boolean },
      //     meta
      //   ): IPlayingTrackResult => {
      //     // The return value for `transformResponse` must match `ResultType`
      //     // return { item: rawResult.item, is_playing: rawResult.is_playing }
      //     console.log(rawResult)

      //     return rawResult
      //   },
    }),
  }),
})

export const { useLazyGetPlayingTrackQuery } = trackApi

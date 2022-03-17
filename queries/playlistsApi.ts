// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IPlaylist } from '../interfacesAndTypes'

// Define a service using a base URL and expected endpoints
export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spotify.com/v1/me/playlists',
  }),
  endpoints: (builder) => ({
    getAllPlaylists: builder.query<IPlaylist, string>({
      query: (token) => ({
        url: '/',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetAllPlaylistsQuery } = playlistsApi

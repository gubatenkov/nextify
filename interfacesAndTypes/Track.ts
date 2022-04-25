import IPlaylistAlbum from './PlaylistAlbum'
import IPlaylistArtist from './IPlaylistArtist'

export default interface ITrack {
  is_playing?: boolean
  id: string
  name: string
  album: IPlaylistAlbum
  duration_ms: number
  artists: IPlaylistArtist[]
}

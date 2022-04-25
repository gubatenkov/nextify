import ITrack from './Track'

export default interface IPlaylistTrack {
  added_at: Date
  index: number
  track: ITrack
}

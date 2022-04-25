export default interface Playlist {
  id: string
  name: string
  description: string
  owner: { display_name: string }
  images: { width: any; height: any; url: string }[]
  [key: string]: any
}

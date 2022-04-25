const TrackArtistCover = ({
  imgUrl,
  name,
  artists,
}: {
  imgUrl: string
  name: string
  artists: string
}) => (
  <div className="flex items-end">
    <div className="mr-4 max-w-[40px]">
      {imgUrl ? (
        <img
          className="h-[100%] w-[100%] object-cover"
          src={imgUrl}
          alt="track cover"
        />
      ) : (
        <ImgPlaceholder />
      )}
    </div>
    <div>
      <p className="text-white">{name}</p>
      <p className="text-sm">{artists}</p>
    </div>
  </div>
)

const ImgPlaceholder = () => (
  <div className="placeholder flex h-[40px] w-[40px] items-center justify-center bg-slate-500">
    <svg
      role="img"
      height="16"
      width="16"
      viewBox="0 0 16 16"
      className="Svg-sc-1bi12j5-0 hDgDGI"
    >
      <path d="M10 2v9.5a2.75 2.75 0 11-2.75-2.75H8.5V2H10zm-1.5 8.25H7.25A1.25 1.25 0 108.5 11.5v-1.25z"></path>
    </svg>
  </div>
)

export default TrackArtistCover

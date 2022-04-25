import React from 'react'

export default function PlaylistCover({ cover }: { cover: string }) {
  return (
    <div className="playllist-cover-box inline-block">
      <img
        className="playllist-cover w-[100%] max-w-[240px] shadow-[0_0_10px_0_rgba(0,0,0,0.75)]"
        src={cover}
        alt="cover"
      />
    </div>
  )
}

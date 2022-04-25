import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SwitchHorizontalIcon, ReplyIcon } from '@heroicons/react/outline'
import {
  PlayIcon,
  RewindIcon,
  PauseIcon,
  FastForwardIcon,
} from '@heroicons/react/solid'

import { TrackArtistCover } from '../'
import { TAppDispatch, TRootState } from '../../interfacesAndTypes'

interface IPlayerProps {
  bgColor: number
}

const endColors = ['to-indigo', 'to-pink', 'to-yellow', 'to-purple', 'to-red']
// const midColors = [
//   'via-indigo',
//   'via-pink',
//   'via-yellow',
//   'via-purple',
//   'via-red',
// ]
// ${midColors[bgColor]}

export default function Player({ bgColor }: IPlayerProps) {
  const dispatch = useDispatch<TAppDispatch>()
  const [isPlaying, setPlaying] = useState(false)
  const track = useSelector((state: TRootState) => state.current.currentTrack)

  return (
    <div
      className={`h-[90px] w-[100%] bg-gradient-to-b from-black-rgba ${endColors[bgColor]} flex items-center justify-between px-5 text-white`}
    >
      <div className="left">
        <TrackArtistCover
          imgUrl={track?.album?.images[2]?.url || ''}
          name={track?.name || ''}
          artists={track?.artists[0]?.name || ''}
        />
      </div>
      <div className="middle absolute left-[50%] flex translate-x-[-50%] items-center gap-5">
        <ButtonIcon icon={SwitchHorizontalIcon} iconH={25} iconW={25} />
        <ButtonIcon icon={RewindIcon} iconH={25} iconW={25} />
        {isPlaying ? (
          <ButtonIcon
            icon={PauseIcon}
            iconH={41}
            iconW={41}
            scale
            onClick={() => setPlaying(false)}
          />
        ) : (
          <ButtonIcon
            icon={PlayIcon}
            iconH={41}
            iconW={41}
            scale
            onClick={() => setPlaying(true)}
          />
        )}
        <ButtonIcon icon={FastForwardIcon} iconH={25} iconW={25} />
        <ButtonIcon icon={ReplyIcon} iconH={25} iconW={20} />
      </div>
      <div className="right">2</div>
    </div>
  )
}

const ButtonIcon = ({
  icon: Icon,
  children,
  iconW = 20,
  iconH = 20,
  color = '#b3b3b3',
  scale = false,
  onClick,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  children?: string
  iconW?: number
  iconH?: number
  color?: string
  scale?: boolean
  onClick?: () => void
}) => {
  return (
    <button
      className={`flex cursor-default items-center ${
        scale && 'hover:scale-[1.1]'
      }`}
      onClick={onClick}
    >
      <div>
        <Icon
          className="hover:text-white"
          width={`${iconW}px`}
          height={`${iconH}px`}
          color={color}
        />
      </div>
      {children && <p className="ml-2">{children}</p>}
    </button>
  )
}

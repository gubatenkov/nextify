import { signOut } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import React, { useState, useRef, useEffect, ReactHTMLElement } from 'react'

import { UserWidgetProps } from '../../interfaces'

export default function UserWidget({ name, image, email }: UserWidgetProps) {
  const ref = useRef(null)
  const [isPopupVisible, setPopupVisible] = useState(false)

  const handleClick = () =>
    isPopupVisible ? setPopupVisible(false) : setPopupVisible(true)

  return (
    <div className="user-widget relative ml-auto w-fit">
      <button
        className="user-btn flex w-fit cursor-pointer items-center rounded-full bg-black/70 hover:bg-[#282828]"
        onClick={handleClick}
        ref={ref}
      >
        <img
          className="pointer-events-none h-[32px] w-[32px] rounded-full"
          src={image || 'https://place-hold.it/32?text=U'}
          alt="user"
        />
        <p className="pointer-events-none mx-3 hidden text-white sm:block">
          {name}
        </p>
        <ChevronDownIcon
          className={`${
            isPopupVisible ? 'rotate-180' : ''
          } pointer-events-none mr-2 hidden h-5 w-5 sm:block`}
        />
      </button>
      {isPopupVisible && (
        <UserWidgetPopup
          closePopup={() => setPopupVisible(false)}
          openElRef={ref}
        />
      )}
    </div>
  )
}

function UserWidgetPopup({
  closePopup,
  openElRef,
}: {
  closePopup: (value: React.SetStateAction<void>) => void
  openElRef: React.MutableRefObject<null | ReactHTMLElement<HTMLElement>>
}) {
  useEffect(() => {
    // define listener function
    const listener = (e: MouseEvent) => {
      const clickedEl = e.target
      if (clickedEl !== openElRef?.current) {
        closePopup()
      }
    }
    // add listener on mount
    document.addEventListener('click', listener)
    // remove event listener on unmount
    return () => document.removeEventListener('click', listener, false)
  }, [])

  return (
    <div className="absolute top-[40px] right-0 w-[190px] rounded-[4px] bg-[#282828] p-[4px] text-sm">
      <ul className="m-0 p-0">
        <li className="rounded-[3px] p-[12px] hover:bg-white/10">Account</li>
        <li className="rounded-[3px] p-[12px] hover:bg-white/10">Profile</li>
        <li
          className="rounded-[3px] p-[12px] hover:bg-white/10"
          onClick={() => signOut()}
        >
          Log out
        </li>
      </ul>
    </div>
  )
}

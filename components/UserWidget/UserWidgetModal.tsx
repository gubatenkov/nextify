import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import React, { useEffect, RefObject } from 'react'

export default function UserWidgetModal({
  closeModal,
  openElRef,
}: {
  closeModal: (value: React.SetStateAction<void>) => void
  openElRef: RefObject<HTMLButtonElement>
}) {
  const router = useRouter()
  useEffect(() => {
    // define DOM mouse click listener
    const listener = (e: MouseEvent): void => {
      const clickedEl = e.target
      if (clickedEl !== openElRef?.current) {
        closeModal()
      }
    }
    // add listener on mount
    document.addEventListener('click', listener)
    // remove on unmount
    return () => document.removeEventListener('click', listener, false)
  }, [])

  const handleClick = async () => {
    // end session and redirect user to auth page without reloading page
    const data = await signOut({ redirect: false, callbackUrl: '/login' })
    router.push(data.url)
  }

  return (
    <div className="absolute top-[40px] right-0 w-[190px] rounded-[4px] bg-[#282828] p-[4px] text-sm">
      <ul className="m-0 p-0">
        <li className="rounded-[3px] p-[12px] hover:bg-white/10">Account</li>
        <li className="rounded-[3px] p-[12px] hover:bg-white/10">Profile</li>
        <li
          className="rounded-[3px] p-[12px] hover:bg-white/10"
          onClick={handleClick}
        >
          Log out
        </li>
      </ul>
    </div>
  )
}

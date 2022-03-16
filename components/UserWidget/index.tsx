import { signOut } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronDownIcon } from '@heroicons/react/outline'
import React, { useRef, useEffect, RefObject } from 'react'

import {
  openUserWidgetModal,
  closeUserWidgetModal,
} from '../../slices/modalsSlice'
import {
  IUserWidgetProps,
  TRootState,
  TAppDispatch,
} from '../../interfacesAndTypes'
import { clearUser } from '../../slices/userSlice'

export default function UserWidget({ name, image, email }: IUserWidgetProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const dispatch = useDispatch<TAppDispatch>()
  const userWidgetModal = useSelector<TRootState, boolean>(
    ({ modals }) => modals.userWidgetModal
  )
  const openModal = (): void => dispatch(openUserWidgetModal())
  const closeModal = (): void => dispatch(closeUserWidgetModal())

  const handleClick = (): void => (userWidgetModal ? closeModal() : openModal())

  return (
    <div className="user-widget relative ml-auto w-fit">
      <button
        className="user-widget-btn flex w-fit cursor-pointer items-center rounded-full bg-black/70 hover:bg-[#282828]"
        onClick={handleClick}
        ref={ref}
      >
        <img
          className="pointer-events-none h-[32px] w-[32px] rounded-full"
          src={image || 'https://place-hold.it/32?text=U'}
          alt="user"
        />
        <p className="pointer-events-none mx-3 hidden text-white sm:block">
          {name || 'User'}
        </p>
        <ChevronDownIcon
          className={`${
            userWidgetModal ? 'rotate-180' : ''
          } pointer-events-none mr-2 hidden h-5 w-5 sm:block`}
        />
      </button>
      {userWidgetModal && (
        <UserWidgetModal closeModal={closeModal} openElRef={ref} />
      )}
    </div>
  )
}

function UserWidgetModal({
  closeModal,
  openElRef,
}: {
  closeModal: (value: React.SetStateAction<void>) => void
  openElRef: RefObject<HTMLButtonElement>
}) {
  const dispatch = useDispatch<TAppDispatch>()
  useEffect(() => {
    // define listener func
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

  const handleClick = () => {
    // clear user in global state
    dispatch(clearUser())
    // end session
    signOut()
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

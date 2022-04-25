import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronDownIcon } from '@heroicons/react/outline'

import {
  openUserWidgetModal,
  closeUserWidgetModal,
} from '../../slices/modalsSlice'
import {
  IUserWidgetProps,
  TRootState,
  TAppDispatch,
} from '../../interfacesAndTypes'
import UserWidgetModal from './UserWidgetModal'

export default function UserWidget({ name, image }: IUserWidgetProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const dispatch = useDispatch<TAppDispatch>()
  const userWidgetModal = useSelector<TRootState, boolean>(
    ({ modals }) => modals.userWidgetModal
  )
  const openModal = () => dispatch(openUserWidgetModal())
  const closeModal = () => dispatch(closeUserWidgetModal())

  const handleClick = () => (userWidgetModal ? closeModal() : openModal())

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

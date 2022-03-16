import React from 'react'

export default function PlaylistSkeleton() {
  return (
    <li className="animate-pulse">
      <div className="mt-3 h-2 rounded bg-slate-800" />
      <div className="mt-3 h-2 w-[50%] rounded bg-slate-800" />
      <div className="mt-3 h-2 w-[75%] rounded bg-slate-800" />
      <div className="mt-3 h-2 rounded bg-slate-800" />
      <div className="mt-3 h-2 w-[35%] rounded bg-slate-800" />
    </li>
  )
}

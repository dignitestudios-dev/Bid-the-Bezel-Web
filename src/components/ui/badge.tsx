import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    className?:string
    title:string
}

const Badge = ({className , title}: Props) => {
  return (
    <div className={cn("rounded-full py-2 px-3 text-cetner flex justify-center items-center  text-xs" , className)} >{title}</div>
  )
}

export default Badge
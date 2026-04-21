import React from 'react'
import { DropdownMenuItem } from './dropdown-menu'
import Image from 'next/image'

type Props = {
    handleGoToChats: () => void;
}

const MessageTab = ({handleGoToChats}: Props) => {
  return (
   <DropdownMenuItem
                  
                    className="cursor-pointer flex gap-2 p-4 rounded-lg group hover:bg-primary! transition-all"
                    onClick={handleGoToChats}
                  >
                    <div className="h-9 w-9 rounded-full relative overflow-hidden">
                      <Image
                        src="/images/user.jpg"
                        alt="User"
                        width={36}
                        height={36}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="group-hover:text-white font-semibold">
                        Iamactive & Admin
                      </p>
                      <div className="mt-1 flex items-center justify-between gap-5">
                        <p className="group-hover:text-gray-100 flex-1 text-gray-700 text-sm truncate">
                          Lectus neque eget ipsum mi tempus sed.
                        </p>

                        <p className="group-hover:text-white text-black font-medium text-sm">
                          1 min
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
  )
}

export default MessageTab
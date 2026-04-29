import { Shield, ShieldCheck } from 'lucide-react'
import React from 'react'

type Props = {}

const AuthStatus = (props: Props) => {
  return (
     <div className="rounded-xl w-full border border-[#E3E3E3]">
      <h1 className="bg-[#F7F7F7] px-5 rounded-t-xl flex justify-start items-center font-semibold gap-2 border-b  border-[#E3E3E3]  py-4">
        {" "}
        <Shield  size={18} /> Authentication status
      </h1>
      <div className='flex flex-col items-center gap-2 p-4'>
        <ShieldCheck fill='#14A752' stroke='white' size={45} className='my-2' />
        <h1 className=' font-semibold text-xl'>Authenticated</h1>
        <p className='text-sm'>This watch has been authenticated by us</p>

      </div>
    </div>
  )
}

export default AuthStatus
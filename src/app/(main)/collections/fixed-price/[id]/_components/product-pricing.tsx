"use client"
import React, { useState } from 'react'
import CurrentBid from './current-bid'
import TopBids from './top-bids'
import AuthStatus from './auth-status'
import Reviews from './reviews'
import FavBtn from '@/components/ui/fav-btn'
import Badge from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {}

const ProductPricing = (props: Props) => {
     const [isFav, setIsFav] = useState(false);
  return (
    <div className='w-[40%] space-y-7'>
      {/* <CurrentBid/>
      <TopBids/> */}
        <div>
            <div className='flex justify-between'>
            <h1 className='flex gap-2 text-3xl font-semibold'>Audemars Piguet Royal Oak </h1>
             <FavBtn isFav={isFav} setIsFav={setIsFav} />
            </div>
            <Badge title='Authenticated' className='bg-linear-to-r w-fit text-background text-center from-[#0D1B2A] to-[#415A77]' />
            <h1 className='text-3xl pt-2'>$765.76 </h1>
            <Link href={"/buy-now"}>
            <Button className='w-full my-6' >Buy Now</Button>
        </Link></div>
      <AuthStatus/>
      <Reviews/>
    </div>
  )
}

export default ProductPricing
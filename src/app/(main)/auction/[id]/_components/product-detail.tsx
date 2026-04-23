"use client"
import Badge from '@/components/ui/badge'
import FavBtn from '@/components/ui/fav-btn'
import Image from 'next/image'
import React, { useState } from 'react'
import EmblaCarousel from './ui/carousel/embla-carousel'
import { EmblaOptionsType } from 'embla-carousel'
import Questions from './questions'

type Props = {
  product: AuctionProduct;
}

const OPTIONS: EmblaOptionsType = {}

const ProductDetail = ({ product }: Props) => {
  const [isFav, setIsFav] = useState(false);
  const isAuthenticated = product?.authentication?.status === 'authenticated';
  return (
    <div className='lg:w-[60%] space-y-8'>
      <div>
        <div className='flex justify-between'>
          <h1 className='flex gap-2 items-start text-xl md:text-3xl font-semibold'>
             {product?.model}
            {isAuthenticated && (
              <Badge title='Authenticated' className='bg-linear-to-r text-background text-center from-[#0D1B2A] to-[#415A77]' />
            )}
          </h1>
          <FavBtn isFav={isFav} setIsFav={setIsFav} />
        </div>
        <h1 className='text-xl md:text-3xl'>${product?.price} <span className='text-base'>Starting Price</span></h1>
        <p className='text-sm text-gray-500 mt-1'>Ref: {product?.referenceId}</p>
      </div>

      <div className='my-4'>
        <EmblaCarousel slides={product?.images ?? []} options={OPTIONS} />
      </div>

      <div>
        <h1 className='font-semibold'>Description</h1>
        <p>{product?.description}</p>
      </div>

      <Questions />
    </div>
  )
}

export default ProductDetail
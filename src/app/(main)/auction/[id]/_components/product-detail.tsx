"use client"
import Badge from '@/components/ui/badge'
import FavBtn from '@/components/ui/fav-btn'
import Image from 'next/image'
import React, { useState } from 'react'
import EmblaCarousel from './ui/carousel/embla-carousel'
import { EmblaOptionsType } from 'embla-carousel'
import Questions from './questions'
type Props = {
  name?:string;
  price?:number
}

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 10
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
const ProductDetail = ({name , price}: Props) => {
     const [isFav, setIsFav] = useState(false);
  return (
    <div className='lg:w-[60%] space-y-8'>
        <div>
            <div className='flex justify-between'>
            <h1 className='flex gap-2 items-start text-xl md:text-3xl font-semibold'>{name}<Badge title='Authenticated' className='bg-linear-to-r text-background text-center from-[#0D1B2A] to-[#415A77]' /></h1>
             <FavBtn isFav={isFav} setIsFav={setIsFav} />
            </div>
            <h1 className='text-xl md:text-3xl'>${price} <sub className='mb-4 text-xs'>Starting Price</sub></h1>
        </div>

        <div className='my-4'>
               <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
        <div>
            <h1 className='font-semibold'>Contents</h1>
            <p>Adipiscing congue fringilla condimentum urna eget nunc at faucibus. Sed nibh hac turpis mi gravida velit. Sagittis risus nibh enim turpis orci.</p>
            <br/>
            <p>Adipiscing congue fringilla condimentum urna eget nunc at faucibus. Sed nibh hac turpis mi gravida velit. Sagittis risus nibh enim turpis orci.</p>
            <br/>
            <hr className=''/>
            <br/>
            <p>Adipiscing congue fringilla condimentum urna eget nunc at faucibus. Sed nibh hac turpis mi gravida velit. Sagittis risus nibh enim turpis orci.</p>
            <br/>
            <p>Adipiscing congue fringilla condimentum urna eget nunc at faucibus. Sed nibh hac turpis mi gravida velit. Sagittis risus nibh enim turpis orci.</p>
        </div>
        <Questions/>
    </div>
  )
}

export default ProductDetail
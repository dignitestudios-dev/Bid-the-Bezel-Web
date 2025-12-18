"use client"
import Badge from '@/components/ui/badge'
import FavBtn from '@/components/ui/fav-btn'
import Image from 'next/image'
import React, { useState } from 'react'
import EmblaCarousel from './ui/carousel/embla-carousel'
import { EmblaOptionsType } from 'embla-carousel'
import Questions from './questions'
type Props = {}

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 10
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
const ProductDetail = (props: Props) => {
  
  return (
    <div className='w-[60%] space-y-8'>
      

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
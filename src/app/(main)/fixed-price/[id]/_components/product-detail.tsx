"use client"
import EmblaCarousel from './ui/carousel/embla-carousel'
import { EmblaOptionsType } from 'embla-carousel'
import Questions from './questions'
type Props = {
  productData: any
}

const OPTIONS: EmblaOptionsType = {}

const ProductDetail = ({ productData }: Props) => {

  const slides = productData?.images ?? [];


  return (
    <div className='w-[60%] space-y-8'>


      <div className='my-4'>
        {slides.length > 0 ? (
          <EmblaCarousel slides={slides} options={OPTIONS} />
        ) : (
          <div className="h-[500px] bg-gray-100 rounded-lg animate-pulse" />
        )}
      </div>
      <div>
        <h1 className='font-semibold'>Contents</h1>
        {productData?.description}
      </div>
      <Questions />
    </div>
  )
}

export default ProductDetail
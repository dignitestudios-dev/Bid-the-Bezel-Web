"use client"
import EmblaCarousel from './ui/carousel/embla-carousel'
import { EmblaOptionsType } from 'embla-carousel'
import Questions from './questions'
import Answers from './answers'
import { useGetQuestions } from '@/features/product-qa/hook'
import { useState } from 'react'
import { QASkeleton } from '@/components/skeleton'
type Props = {
  productData: any
}

const OPTIONS: EmblaOptionsType = {}

const ProductDetail = ({ productData }: Props) => {

  const slides = productData?.images ?? [];
  const [page, setPage] = useState(1);
  const { data: productQAndA, isLoading } = useGetQuestions(productData?._id, page)
  const pagination = productQAndA?.pagination


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
        <h1 className='font-semibold break-all'>Contents</h1>
        {productData?.description}
      </div>
      {isLoading ? (
        <QASkeleton />
      ) : productData?.isMyProduct ? (
        <Answers
          productQAndA={productQAndA?.data}
          page={page}
          setPage={setPage}
          pagination={pagination}
        />
      ) : (
        <Questions
          id={productData?._id}
          productQAndA={productQAndA?.data}
          page={page}
          setPage={setPage}
          pagination={pagination}
        />
      )}
    </div>
  )
}

export default ProductDetail
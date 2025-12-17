import React, { use } from 'react'
import SingleProduct from './_components/single-product'
type Props = {
  params: Promise<{id:string}>
}

const Page = ({params}: Props) => {
 const {id} = use(params)
  return (
    <div><SingleProduct id={id}/></div>
  )
}

export default Page
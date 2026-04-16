import React, { Suspense } from 'react'
import ShippingDetailAuth from './_components/shipping-details'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Suspense fallback={null}>
        <ShippingDetailAuth />
      </Suspense>
    </div>
  )
}

export default page
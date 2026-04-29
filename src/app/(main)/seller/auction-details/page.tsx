import React, { Suspense } from 'react'
import PersonalDetailAuction from './_components/personal-details-auction'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='max-w-screen-2xl mx-auto w-[90%]' >
      <Suspense fallback={<div>Loading...</div>}>
        <PersonalDetailAuction/>
      </Suspense>
    </div>
  )
}

export default page
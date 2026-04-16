import React, { Suspense } from 'react'
import PersonalDetailFixed from './_components/personal-detail-fixed'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='max-w-screen-2xl mx-auto w-[90%]'>
      <Suspense fallback={null}>
        <PersonalDetailFixed />
      </Suspense>
    </div>
  )
}

export default page
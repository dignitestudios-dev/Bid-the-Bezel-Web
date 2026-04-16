import React, { Suspense } from 'react'
import WatchListed from './_components/watch-listed'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Suspense fallback={null}>
        <WatchListed />
      </Suspense>
    </div>
  )
}

export default page
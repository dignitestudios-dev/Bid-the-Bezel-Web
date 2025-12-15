import React from 'react'
import CurrentBid from './current-bid'
import TopBids from './top-bids'
import AuthStatus from './auth-status'
import Reviews from './reviews'

type Props = {}

const BiddingDetail = (props: Props) => {
  return (
    <div className='w-[40%] space-y-7'>
      <CurrentBid/>
      <TopBids/>
      <AuthStatus/>
      <Reviews/>
    </div>
  )
}

export default BiddingDetail
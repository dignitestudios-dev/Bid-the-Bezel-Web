"use client"
import React, { use } from 'react'
import Authenticate from './_components/authenticate'
type Props = {
  params: Promise<{ id: string }>;
};

const page = ({ params }: Props) => {
  const { id } = use(params);

  return (
    <div><Authenticate id={id} /></div>
  )
}

export default page
"use client"

import React, { useState } from 'react'
import Plans from './_components/plans';
import PlanSelected from './_components/plan-selected';
import Success from './_components/success';
import SaleType from './_components/sale-type';
import PersonalDetailAuction from './_components/personal-details-auction';
import Authenticate from './_components/authenticate';
import ShippingDetail from './_components/shipping-details';
import PaymentDone from './_components/payment-done';
import WatchListed from './_components/watch-listed';
import PersonalDetailFixed from './_components/personal-detail-fixed';


type Props = {}

const page = (props: Props) => {
      const [currentStep, setCurrentStep] = useState<Step>("purchase-plan");
  return (
    <div className='max-w-screen-2xl  mx-auto w-[95%]'>
       {currentStep == "purchase-plan" && <Plans setCurrentStep={setCurrentStep}/>}
       {currentStep == "plan-selected" && <PlanSelected setCurrentStep={setCurrentStep}/>}
       {currentStep == "subscription-confirmation" && <Success setCurrentStep={setCurrentStep}/>}
       {currentStep == "sale-type" && <SaleType setCurrentStep={setCurrentStep}/>}
       {currentStep == "personal-detail-auction" && <PersonalDetailAuction setCurrentStep={setCurrentStep}/>}
       {currentStep == "personal-detail-fixed" && <PersonalDetailFixed setCurrentStep={setCurrentStep}/>}
       {currentStep == "authenticate" && <Authenticate setCurrentStep={setCurrentStep}/>}
       {currentStep == "shipping" && <ShippingDetail setCurrentStep={setCurrentStep}/>}
       {currentStep == "payment-done" && <PaymentDone setCurrentStep={setCurrentStep}/>}
       {currentStep == "watch-listed" && <WatchListed/>}
    </div>
  )
}

export default page
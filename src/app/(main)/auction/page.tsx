"use client"

import React, { useState } from 'react'
import Plans from './_components/plans';
import PlanSelected from './_components/plan-selected';
import Success from './_components/success';
import SaleType from './_components/sale-type';
import PersonalDetail from './_components/personal-details';
import Authenticate from './_components/authenticate';
import ShippingDetail from './_components/shipping-details';
import PaymentDone from './_components/payment-done';
import WatchListed from './_components/watch-listed';


type Props = {}
type Step =
  | "login"
  | "register"
  | "otp-register"
  | "username"
  | "purchase-plan"
  | "plan-selected"
  | "subscription-confirmation"
  | "sale-type"
  | "personal-detail"
  | "authenticate"
 | "shipping"
 | "payment-done"
| "watch-listed"
const page = (props: Props) => {
      const [currentStep, setCurrentStep] = useState<Step>("purchase-plan");
  return (
    <div className='max-w-screen-2xl  mx-auto w-[95%]'>
       {currentStep == "purchase-plan" && <Plans setCurrentStep={setCurrentStep}/>}
       {currentStep == "plan-selected" && <PlanSelected setCurrentStep={setCurrentStep}/>}
       {currentStep == "subscription-confirmation" && <Success setCurrentStep={setCurrentStep}/>}
       {currentStep == "sale-type" && <SaleType setCurrentStep={setCurrentStep}/>}
       {currentStep == "personal-detail" && <PersonalDetail setCurrentStep={setCurrentStep}/>}
       {currentStep == "authenticate" && <Authenticate setCurrentStep={setCurrentStep}/>}
       {currentStep == "shipping" && <ShippingDetail setCurrentStep={setCurrentStep}/>}
       {currentStep == "payment-done" && <PaymentDone setCurrentStep={setCurrentStep}/>}
       {currentStep == "watch-listed" && <WatchListed/>}
    </div>
  )
}

export default page
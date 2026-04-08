"use client"
import Plans from '@/app/(main)/_components/plans'




type Props = {
  // setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;\
}
const PlansSubs = ({ }: Props) => {

  return (
    <div>
      <Plans />
    </div>
  )
}

export default PlansSubs
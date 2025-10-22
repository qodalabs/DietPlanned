"use client"
import { useRouter } from 'next/navigation'
import AssessmentForm from '@/components/AssessmentForm'

export default function AssessmentClient() {
  const router = useRouter()
  return (
    <AssessmentForm onComplete={(data) => {
      if (data?.planId) router.push(`/dashboard/plan/${data.planId}`)
    }} />
  )
}


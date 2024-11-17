import { Spinner } from '@nextui-org/react'

export default function Loading() {
  return (
    <div className="w-full min-h-full flex items-center justify-center">
      <Spinner>Loading...</Spinner>
    </div>
  )
}

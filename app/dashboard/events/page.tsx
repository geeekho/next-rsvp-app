import { getAllEvent } from '@/utils/events'
import { getCurentUser } from '@/utils/user'
import { NextPage } from 'next'
import Link from 'next/link'

interface Props {}

const Page: NextPage<Props> = async ({}) => {
  const user = await getCurentUser()
  const events = await getAllEvent(user.id)
  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>
          <Link href={`/dashboard/events/${event.id}`}>{event.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default Page

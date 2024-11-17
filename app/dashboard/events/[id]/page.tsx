import { getOneEvent } from '@/utils/events'
import { getCurentUser } from '@/utils/user'
import { redirect } from 'next/navigation'

const EventPage = async ({ params }: { params: { id: string } }) => {
  const user = await getCurentUser()
  const event = await getOneEvent(user.id, params.id)

  if (!event) redirect('/dashboard/events')

  return <div>{event.name}</div>
}

export default EventPage

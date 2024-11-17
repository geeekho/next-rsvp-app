'use server'
import { db } from '@/db/db'
import { events } from '@/db/schema'
import { delay } from '@/utils/delay'
import { getCurentUser } from '@/utils/user'
import randomName from '@scaleway/random-name'
import { revalidateTag } from 'next/cache'

export const createNewEvent = async () => {
  await delay(2000)
  const user = await getCurentUser()

  await db.insert(events).values({
    createdById: user.id,
    startOn: new Date().toUTCString(),
    name: randomName('event', ' '),
  })

  revalidateTag('dashboard:events')
  revalidateTag('events')
}

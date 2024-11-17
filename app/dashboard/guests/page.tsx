import { getGuestList } from '@/utils/attendees'
import { getCurentUser } from '@/utils/user'

const GuestsPage = async () => {
  const user = await getCurentUser()
  const guests = await getGuestList(user.id)

  return (
    <div>
      {guests.map((guest) => (
        <div key={guest.id}>{guest.name}</div>
      ))}
    </div>
  )
}

export default GuestsPage

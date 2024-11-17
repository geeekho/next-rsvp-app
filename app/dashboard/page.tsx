import { getAttendeesCountForDashboard } from '@/utils/attendees'
import { getCurentUser } from '@/utils/user'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

const DashboardPage = async () => {
  const user = await getCurentUser()
  const count = await getAttendeesCountForDashboard(user.id)
  return (
    <div className="w-full flex h-full justify-center items-center">
      <div>
        <h4 className="text-lg">Attendees</h4>
        <h2 className="text-6xl font-semibold my-8 text-center">{count}</h2>
      </div>
    </div>
  )
}

export default DashboardPage

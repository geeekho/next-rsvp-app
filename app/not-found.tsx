import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="w-full flex-col min-h-screen flex items-center justify-center gap-y-4">
      <h1>404 - Page Not Found</h1>
      <Link href={'/dashboard'}>
        <h2 className="hover:bg-primary text-3xl rounded-lg border border-default-50 p-2">
          Home
        </h2>
      </Link>
    </div>
  )
}

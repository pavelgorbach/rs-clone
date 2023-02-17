import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'

import { Header, Footer, Modals } from '@/components'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="prose-base flex flex-1 flex-col p-4 lg:prose-lg xl:prose-xl 2xl:prose-2xl">
        <Outlet />
      </main>
      <Footer />

      <Modals />
      <ToastContainer />
    </div>
  )
}

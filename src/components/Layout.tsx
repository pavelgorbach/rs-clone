import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'

import { Header, Footer, Modals } from '@/components'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-slate-800">
      <Header />
      <main className="prose-sm flex flex-1 flex-col p-4 lg:prose-base xl:prose-base 2xl:prose-lg">
        <Outlet />
      </main>
      <Footer />

      <Modals />
      <ToastContainer />
    </div>
  )
}

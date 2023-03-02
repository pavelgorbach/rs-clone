import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'

import { Header, Footer, Modals } from '@/components'

export function LayoutView() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-slate-700">
      <Header />
      <main className="xl:prose-md prose-sm flex flex-1 flex-col p-4 lg:prose-base 2xl:prose-lg">
        <Outlet />
      </main>
      <Footer />

      <Modals />
      <ToastContainer />
    </div>
  )
}

export const Layout = observer(LayoutView)

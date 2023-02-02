import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

import 'react-toastify/dist/ReactToastify.css'
import GreetinPage from './Main/GreetinPage'

export function PageLayout() {
  return (
    <>
      <Header />
      {/* todo stretch grey line to the full screen */}
      <main className="prose m-auto max-w-screen-2xl p-4 lg:prose-xl">
        <GreetinPage />
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}

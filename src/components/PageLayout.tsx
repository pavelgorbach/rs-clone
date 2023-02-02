import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

import 'react-toastify/dist/ReactToastify.css'

export function PageLayout() {
  return (
    <>
      <Header />
      <main className="prose max-w-screen-2xl p-4 lg:prose-xl">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}

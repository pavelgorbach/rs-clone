import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

import 'react-toastify/dist/ReactToastify.css'

export function PageLayout() {
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="container m-auto py-4 sm:prose-sm md:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  )
}

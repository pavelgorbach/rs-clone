import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'

import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer'

import 'react-toastify/dist/ReactToastify.css'

export function PageLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="prose-base flex flex-1 flex-col p-4 lg:prose-lg xl:prose-xl 2xl:prose-2xl">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  )
}

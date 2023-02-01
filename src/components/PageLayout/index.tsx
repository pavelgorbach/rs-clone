import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'

import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

import 'react-toastify/dist/ReactToastify.css'
import './style.css'

export function PageLayout() {
  return (
    <>
      <Header />
      <main className="main prose lg:prose-xl">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}

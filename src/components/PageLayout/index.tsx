import { Outlet } from 'react-router'

import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

import './style.css'

export function PageLayout() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import cx from 'classnames'

import { Header, Footer, Modals } from '@/components'
import useThemeStore from '@/hooks/useThemeStore'

export function LayoutView() {
  const theme = useThemeStore()

  return (
    <div className={cx(theme.theme)}>
      <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-slate-700">
        <Header />
        <main className="xl:prose-md prose-sm flex flex-1 flex-col p-4 lg:prose-base 2xl:prose-lg">
          <Outlet />
        </main>
        <Footer />

        <Modals />
        <ToastContainer />
      </div>
    </div>
  )
}

export const Layout = observer(LayoutView)

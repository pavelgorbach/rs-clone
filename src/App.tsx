import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { PageLayout } from '@/components'
import { Home, Main, Board, Profile, NoMatch } from '@/pages'
import { ROUTES } from './constants'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path={ROUTES.home} element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path={ROUTES.main} element={<Main />} />
            <Route path={`${ROUTES.board}/:id`} element={<Board />} />
            <Route path={ROUTES.profile} element={<Profile />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App

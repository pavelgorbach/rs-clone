import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { PageLayout } from '@/components'

import { Home, BoardsList, Board, Profile, NoMatch } from '@/pages'

import { ROUTES } from './constants'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.base} element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.boardsList} element={<BoardsList />} />
          <Route path={`${ROUTES.board}/:id`} element={<Board />} />
          <Route path={ROUTES.profile} element={<Profile />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

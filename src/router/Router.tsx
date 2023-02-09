import { Routes, Route } from 'react-router-dom'

import { PageLayout } from '@/components'
import { Home, Main, Board, Profile, NoMatch, SignIn, SignUp } from '@/pages'

export const ROUTES = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  main: '/main',
  board: '/board',
  profile: '/profile'
}

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.signIn} element={<SignIn />} />
        <Route path={ROUTES.signUp} element={<SignUp />} />
        <Route path={ROUTES.main} element={<Main />} />
        <Route path={ROUTES.profile} element={<Profile />} />
        <Route path={`${ROUTES.board}/:id`} element={<Board />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}

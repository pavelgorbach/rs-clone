import { Routes, Route } from 'react-router-dom'

import { Layout } from '@/components'
import { Home, Main, Board, Profile, NoMatch, SignIn, SignUp } from '@/pages'

export const ROUTES = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  boards: '/boards',
  profile: '/profile'
}

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.signIn} element={<SignIn />} />
        <Route path={ROUTES.signUp} element={<SignUp />} />
        <Route path={ROUTES.boards} element={<Main />} />
        <Route path={ROUTES.profile} element={<Profile />} />
        <Route path={`${ROUTES.boards}/:id`} element={<Board />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}

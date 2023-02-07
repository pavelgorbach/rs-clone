import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ROUTES } from '@/constants'
import { AuthProvider, QueryProvider } from '@/providers'
import { PageLayout, RequireAuth } from '@/components'
import { Home, Main, Board, Profile, NoMatch, SignIn, SignUp } from '@/pages'

function App() {
  return (
    <Router>
      <AuthProvider>
        <QueryProvider>
          <Routes>
            <Route path={ROUTES.home} element={<PageLayout />}>
              <Route index element={<Home />} />
              <Route path={ROUTES.signIn} element={<SignIn />} />
              <Route path={ROUTES.signUp} element={<SignUp />} />
              <Route
                path={ROUTES.main}
                element={
                  <RequireAuth>
                    <Main />
                  </RequireAuth>
                }
              />
              <Route
                path={ROUTES.profile}
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route
                path={`${ROUTES.board}/:id`}
                element={
                  <RequireAuth>
                    <Board />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </QueryProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

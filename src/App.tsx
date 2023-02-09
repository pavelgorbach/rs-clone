import { BrowserRouter } from 'react-router-dom'

import Providers from '@/providers'
import Router from './router/Router'

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Router />
      </Providers>
    </BrowserRouter>
  )
}

export default App

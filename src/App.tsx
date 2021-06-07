import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import '@/App.global.css'

import Home from '@/pages/Home'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} path='/' />
      </Switch>
    </Router>
  )
}

export default App

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Hello from '@/hello/Hello';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Hello} path="/" />
      </Switch>
    </Router>
  );
};

export default App;


import { Route, Switch } from 'react-router-dom';
import './App.css'
import Login from './components/Login'


function App() {

  return (
    <>
      <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
      </Switch>
    </>
  )
}

export default App

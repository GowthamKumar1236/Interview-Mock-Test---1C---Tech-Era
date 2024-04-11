import {Switch, Route, Redirect} from 'react-router-dom'

import HomeRoute from './components/HomeRoute'
import CoursesDetailsRoute from './components/CoursesDetailsRoute'
import NotFoundRoute from './components/NotFoundRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={HomeRoute} />
    <Route exact path="/courses/:id" component={CoursesDetailsRoute} />
    <Route path="/not-found" component={NotFoundRoute} />
    <Redirect to="not-found" />
  </Switch>
)

export default App

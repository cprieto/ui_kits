import * as React from 'react'
import { Navbar, Nav } from 'rsuite'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Entry from './Entry'
import List from './List'

const App = () => (
  <Router>
    <Navbar appearance="inverse">
      <Navbar.Header>
        <a href="#" className="navbar-brand logo">Kronbute</a>
      </Navbar.Header>
      <Navbar.Body>
        <Nav>
          <Nav.Item componentClass={Link} to="/list">List</Nav.Item>
          <Nav.Item componentClass={Link} to="/data">Entry</Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>

    <Switch>
      <Route exact={true} path="/list" component={List} />
      <Route exact={true} path="/data" component={Entry} />
    </Switch>
  </Router>
)

export default App

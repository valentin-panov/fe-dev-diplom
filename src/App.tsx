import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/common.scss';
import Error404 from './components/Error404/Error404';
import { Wrapper } from './components/Wrapper';

export const appURL = '/fe-diploma';
export const serverURL = 'https://fe-diplom.herokuapp.com';

function App(): ReactElement {
  return (
    <Router basename={appURL}>
      <Switch>
        <Route exact path="/" component={Wrapper} />
        <Route path="/about.html" exact component={Error404} />
        <Route path="/contacts.html" exact component={Error404} />
        <Route path="/catalog.html" exact component={Error404} />
        <Route path="/items/:id.html" exact component={Error404} />
        <Route path="/cart.html" exact component={Error404} />
        <Route path="*" component={Error404} /> CartIcon
      </Switch>
    </Router>
  );
}

export default App;

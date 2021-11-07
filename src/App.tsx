import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/common.scss';
import Error404 from './components/Error404/Error404';
import { Wrapper } from './components/Wrapper';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { LandingPage } from './components/LandingPage';

export const appURL = '/fe-dev-diplom';
export const serverURL = 'https://fe-diplom.herokuapp.com';

function App(): ReactElement {
  return (
    <Router basename={appURL}>
      <Wrapper>
        <Header />
        <Main>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/select" component={Error404} />
            <Route exact path="/success" component={Error404} />
            <Route exact path="/items/:id.html" component={Error404} />
            <Route exact path="/cart.html" component={Error404} />
            <Route path="*" component={Error404} /> CartIcon
          </Switch>
        </Main>
        <Footer />
      </Wrapper>
    </Router>
  );
}

export default App;

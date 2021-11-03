import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/common.scss';
import Error404 from './components/Error404/Error404';
import { Wrapper } from './components/Wrapper';
import Loading from './components/Loading/Loading';
import { Template } from './components/TEMPLATE/Template';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';

export const appURL = '/fe-diploma';
export const serverURL = 'https://fe-diplom.herokuapp.com';

function App(): ReactElement {
  return (
    <Router basename={appURL}>
      <Wrapper>
        <Header />
        <Main>
          <Switch>
            <Route exact path="/" component={Loading} />
            <Route exact path="/how" component={Template} />
            <Route exact path="/contacts" component={Error404} />
            <Route exact path="/catalog.html" component={Error404} />
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

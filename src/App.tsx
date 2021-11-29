import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/common.scss';
import Error404 from './components/Error404/Error404';
import { Wrapper } from './components/Wrapper';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { LandingPage } from './components/LandingPage';
import { Success } from './components/Success';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { SelectionScreen } from './components/SelectionScreen';
import { Loading } from './components/Loading';

export const appURL = '/fe-dev-diplom';
export const serverURL = 'https://fe-diplom.herokuapp.com';

function App(): ReactElement {
  return (
    <Router basename={appURL}>
      <ScrollToTop />
      <Wrapper>
        <Header />
        <Main>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/select" component={SelectionScreen} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/items/:id.html" component={Error404} />
            <Route exact path="/loading" component={Loading} />
            <Route path="*" component={Error404} /> CartIcon
          </Switch>
        </Main>
        <Footer />
      </Wrapper>
    </Router>
  );
}

export default App;

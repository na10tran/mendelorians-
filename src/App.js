import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom'
import {Router, useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';
import AboutUs from './components/pages/AboutUs'
import SignUp from './components/pages/SignUp'
import FAQ from './components/pages/FAQ'

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        //<Router>
          <Switch>
            <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
            <AppRoute  path ="/AboutUs" component = {AboutUs} />
            <AppRoute  path ="/SignUp" component = {SignUp} />
            <AppRoute  path ="/FAQ" component = {FAQ} />
          </Switch>
        //</Router>
      )} />
  );
}

export default App;
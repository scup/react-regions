import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';
import { createHashHistory, useBasename } from 'history';

import Main from './main-view.jsx'
import Hook from '../src//Hook.jsx';

const history = useBasename(createHashHistory)({ basename: '', queryKey : false});


class One extends React.Component {
  render() {
    return (
      <h1>One</h1>
    );
  }
}

class Two extends React.Component {
  render() {
    return (
      <h1>Two</h1>
    );
  }
}

export default (<Router history={history}>
  <Route path="/" component={Main}>
    <Route path="one/:paramOfOne/*" component={One}></Route>
    <Route path="two/:paramOfTwo/*" component={Two}></Route>
  </Route>
</Router>);

import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';
import { createHashHistory, useBasename } from 'history';

import Main from './main-view.jsx'
import Hook from '../src/Hook.jsx';

const history = useBasename(createHashHistory)({ basename: '', queryKey : false});


class One extends React.Component {
  render() {
    return (
      <div>
          <h1>One</h1>
          <Hook to="/two/teste" region={this.props.regions.aux}>OPEN</Hook>
          <Hook remove region={this.props.regions.aux}>CLOSE</Hook>
      </div>
    );
  }
}

class Two extends React.Component {
  render() {
    return (
      <div>
        <h1>Two</h1>
        <Hook to="/one/teste" region={this.props.regions.main}>LINK</Hook>
      </div>);
  }
}

export default (<Router history={history}>
  <Route path="/" component={Main}>
    <Route path="one/:paramOfOne/*" component={One}></Route>
    <Route path="two/:paramOfTwo/*" component={Two}></Route>
  </Route>
</Router>);

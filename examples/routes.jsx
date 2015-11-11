import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';
import { createHashHistory, useBasename } from 'history';

import Main from './main-view.jsx'
import Hook from '../src//Hook.jsx';

const history = useBasename(createHashHistory)({ basename: '', queryKey : false});


class One extends React.Component {
  render() {
    console.log(this.props.regions);
    return (
      <div>
          <h1>One</h1>
          <Hook to="/two/teste" where={this.props.regions.aux}>LINK</Hook>
      </div>

    );
  }
}

class Two extends React.Component {
  render() {
    console.log(this.props.regions);
    return (
      <div>
        <h1>Two</h1>
        <Hook to="/one/teste" where={this.props.regions.main}>LINK</Hook>
      </div>);
  }
}

export default (<Router history={history}>
  <Route path="/" component={Main}>
    <Route path="one/:paramOfOne/*" component={One}></Route>
    <Route path="two/:paramOfTwo/*" component={Two}></Route>
  </Route>
</Router>);

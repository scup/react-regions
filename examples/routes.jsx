import React, { PropTypes } from 'react';
import { Router, Route, Link, Redirect } from 'react-router';
import { createHashHistory, useBasename } from 'history';

import Main from './main-view.jsx';
import Hook from '../src/Hook.jsx';
import Region from '../src/Region.jsx';

const history = useBasename(createHashHistory)({basename: '', queryKey: false});

class One extends React.Component {

  static propTypes = {
    region: PropTypes.shape(Region.propTypes),
    regions: PropTypes.any
  };

  render() {
    return (
      <div>
        <h1>One</h1>
        <Hook to="/two/teste" region={this.props.regions.aux}>OPEN</Hook>
        <Hook remove region={this.props.regions.aux}>\</Hook>
      </div>
    );
  }
}

class Two extends React.Component {

  static propTypes = {
    region: PropTypes.shape(Region.propTypes),
    regions: React.PropTypes.any
  };

  close() {
    Hook.close(this.props.region);
  }

  go() {
    Hook.go(this.props.region, '/one/teste');
  }

  render() {
    return (
      <div>
        <h1>Two</h1>
        <Hook to="/one/teste" region={this.props.regions.main}>LINK</Hook>

        <h1 onClick={this.close.bind(this)}>Virtual Hook</h1>

        <h1 onClick={this.go.bind(this)}>Virtual Hook</h1>
      </div>);
  }
}

export default (<Router history={history}>
  <Route path="/" component={Main}>
    <Route path="one/:paramOfOne/*" component={One}/>
    <Route path="two/:paramOfTwo/*" component={Two}/>
  </Route>
</Router>);

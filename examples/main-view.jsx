import React from 'react';

import myRegions from './regions.jsx';
import myRoutes from './routes.jsx';

import Region from '../src/Region.jsx';
import Application from '../src/Application.jsx';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Application regions={myRegions} routes={myRoutes}>
        <div className="container">
          <div className="view-container">
            <Region title="main"/>
            <Region title="aux"/>
          </div>
        </div>
      </Application>
    );
  }
}

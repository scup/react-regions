import React from 'react';

import myRegions from './regions.jsx';

import Region from '../src/Region.jsx';
import Application from '../src/Application.jsx';


export default class Main extends React.Component {
  constructor(){
  	super()
  	this.state = {};
  }

  render() {
    return (
    	<Application regions={myRegions}>
        <div className="container">
          <div className="view-container">
          	<Region title="main" />
  					<Region title="aux" />
          </div>
        </div>
	     </Application>
    );
  }
}

import React from 'react';
import Region from './Region.jsx';

export default class Hook extends React.Component {
  render() {
    let myRoute = Region.getMyportion(
    	this.props.where.location,
    	this.props.where.regionProps.routeFragment,
    	this.props.to
    );

    if (location.hash.indexOf('#') !== -1){
    	myRoute.diff = '#' + myRoute.diff
    }
    return <a href={myRoute.diff}>{this.props.children}</a>
  }
};

import React from 'react';
import Region from './Region';

export default class Hook extends React.Component {
  static propTypes = {
    where: React.PropTypes.any,
    to: React.PropTypes.any,
    children: React.PropTypes.any,
  }

  render() {

    let myRoute = Region.getMyPortion(
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

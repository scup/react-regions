import React from 'react';
import Region from './Region';

export default class Hook extends React.Component {
  static propTypes = {
    where: React.PropTypes.any,
    to: React.PropTypes.any,
    children: React.PropTypes.any,
  }


  static close(region){
    var myRoute = Region.removePortion(
      region.location,
      region.regionProps.routeFragment
    );
    window.location.hash = myRoute[0].replace(/\/+$/,'/');
  }

  static go(region,to){
    var myRoute = Region.getLinkTo(
      region.location,
      region.regionProps.routeFragment,
      to
    );
    window.location.hash = myRoute.replace(/\/+$/,'/');
  }

  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler(location) {
    window.location.hash = location.replace(/\/+$/,'/');
  }

  render() {

    let myRoute;
    if (this.props.remove){
      myRoute = Region.removePortion(
        this.props.region.location,
        this.props.region.regionProps.routeFragment
      );
      if (location.hash.indexOf('#') !== -1){
        myRoute = '#' + myRoute
      }
    }

    if (this.props.to){
      myRoute = Region.getLinkTo(
        this.props.region.location,
        this.props.region.regionProps.routeFragment,
        this.props.to
      );

      if (location.hash.indexOf('#') !== -1){
        myRoute = '#' + myRoute
      }
    }

    return (
      <div onClick={this.clickHandler.bind(this, myRoute)}>
        {this.props.children}
      </div>
    );
  }
};

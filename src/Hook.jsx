import React from 'react';
import Region from './Region';

export default class Hook extends React.Component {
  static propTypes = {
    where: React.PropTypes.any,
    to: React.PropTypes.any,
    children: React.PropTypes.any,
  }

  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler(location) {
    window.location.hash = location.replace(/\/+$/,'/');
  }

  componentWillRender() {
    if (this.props.where.regionProps) {
      return (
        <div onClick={this.clickHandler.bind(this, this.props.to)}>
          {this.props.children}
        </div>
      );
    }
  }

  render() {

    console.log(this.props.where);

    let myRoute = Region.getLinkTo(
      this.props.where.location,
      this.props.where.regionProps.routeFragment,
      this.props.to
    );

    console.log(myRoute);

    if (location.hash.indexOf('#') !== -1){
      myRoute.diff = '#' + myRoute.diff
    }

    return (
      <div onClick={this.clickHandler.bind(this, myRoute.diff)}>
        {this.props.children}
      </div>
    );
  }
};

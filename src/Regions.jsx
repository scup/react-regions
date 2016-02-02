import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ComponentValidator from './ComponentValidator.jsx';
import Region from './Region.jsx';

export default class Regions extends React.Component {

  constructor() {
    super();
    this.state = {};
    this.regions = {};
  }

  static propTypes = {
    children: PropTypes.any,
  };

	getRegion(title) {
		if (this.regions[title])
		return this.regions[title];
	}

  static _splitPath( path ) {
    return path.replace(/\|\|/,'|').split('/').filter((frag) => frag !== '');
  }

  static _getMatchedRoute(location, route) {
    let params = {};
    let originalRoute = route;
    let original_location = location = Regions._splitPath(location);

    route = Regions._splitPath(route.props.path);

    let matchs = route.filter((fragment, index) => {
      const matched = (location[index] === fragment || fragment === '*' || fragment.indexOf(':') !== -1);
      if (fragment.indexOf(':') !== -1) {
        params[fragment.replace(':','')] = location[index];
      }

      return matched;
    });

    if (matchs.length === route.length) {
      return { originalRoute, params };
    }
  }

  static _findRoute(location, routes) {
    if (location) {
      if (!routes.filter) {
        routes = routes.props.children;
      }

      let finalRoute;

      for (let route of routes) {
        finalRoute = Regions._getMatchedRoute(location, route);
        if (finalRoute) { return finalRoute; }
      }
    }
  }

	static fetch(RegionsInstace, routesDeclaration) {

      if (this.prototype.cachedView === undefined) {
        this.prototype.cachedView = ReactDOM.render(RegionsInstace, document.createElement('div'));
      }
      this.prototype.cachedView.refresh(routesDeclaration);

      return this.prototype.cachedView;
	}

  _addRegionObject(region, skipPath) {
    const regionDefinition = {
      renderTo: region.props.title,
      path: skipPath === true ? undefined : Region.getMyPortion(this.requestedLocation, region.props.routeFragment),
      regionProps: region.props
    };

    let matchedRoute = Regions._findRoute(regionDefinition.path, this.routesDeclaration.props.children);

    if (matchedRoute === undefined) {
      console.warn(
        'Route ' + regionDefinition.path + ' doesn\'t match any route.','You should try one of these :\n',
        React.Children.map(this.routesDeclaration.props.children.props.children, (child) => {
          return child.props.path;
        })
      );
    }

    let component = false;

    this.regions[regionDefinition.renderTo] = {};
    this.regions[regionDefinition.renderTo].regionProps = regionDefinition.regionProps;
    this.regions[regionDefinition.renderTo].location = this.requestedLocation;

    if (matchedRoute) {
      component = matchedRoute.originalRoute.props.component;
    }

    if (component) {
      component = React.createElement(component, { params : matchedRoute.params });
    }

    this.regions[regionDefinition.renderTo].component = component;
  }

  refresh(routesDeclaration) {
    this.regions = {};
    this.routesDeclaration = routesDeclaration;
    this.requestedLocation = ('/' + location.hash.replace('#','') + location.search).replace(/\/\//,'/');

    const mainRegion = this.props.children.find((child) => child.props.main);

    if (Region.checkMatch(this.requestedLocation, mainRegion.props.routeFragment)) {
      this.props.children.forEach(this._addRegionObject.bind(this));
    } else {
      this._addRegionObject(mainRegion);
      this.props.children.forEach((region) => {
        if (!region.props.main) {
          this._addRegionObject(region, true);
        }
      });

    }
  }

  render() {
    return null;
  }
};

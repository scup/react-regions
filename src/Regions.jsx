
function checkMatch(location, route) {
  let params = {}
  let original_route = route;
  let original_location = location = location.replace(/\|\|/,'|').split('/').filter((frag) => frag !== '');

  route = route.props.path.replace(/\|\|/,'|').split('/').filter((frag) => frag !== '');

  let matchs = route.filter((frag, index) => {
    let matched = (location[index] === frag || frag === '*' || frag.indexOf(':') !== -1);

    if (frag.indexOf(':') !== -1){
      params[frag.replace(':','')] = location[index];
    }

    return matched;
  });

  if (matchs.length === route.length) {
    if (original_route.props.children) {
      return findRoute(original_location.join('/'), original_route.props.children);
    }

    return {original_route,params};
  }

  return false;
}

function findRoute(location, routes) {

  if (!location)
  return false;

  if (!routes.filter) {
    routes = routes.props.children;
  }

  let finalRoutes = routes.map((route) => {
    return checkMatch(location,route);
  }).filter((route) => route)[0];

  return finalRoutes;
}












import React from 'react';
import ReactDOM from 'react-dom';
import Region from './Region.jsx';

export default class Regions extends React.Component {
	getRegion(title){
		if (this.Regions[title])
		return this.Regions[title];
	}

	static fetch(RegionsInstace,routesDeclaration){
      if (this.prototype.cachedViews === undefined) {
        this.prototype.cachedViews = ReactDOM.render(RegionsInstace,document.createElement('div'));
        this.prototype.cachedViews.reRender(routesDeclaration);
      }
      this.prototype.cachedViews.reRender(routesDeclaration);

      return this.prototype.cachedViews;
	}

  constructor() {
    super();
    this.state = {};
    this.Regions = {};
  }

  reRender(routesDeclaration) {
    this.Regions = {};
    let myRegions = [];
    let mainRegion = this.props.children.filter((child) => {
      return child.props.main
    })[0];

    let requestedLocation = (location.pathname+location.hash.replace('#','')+location.search).replace(/\/\//,'/');

    if (Region.checkMatch(requestedLocation,mainRegion.props.routeFragment)) {
      myRegions = this.props.children.map((region) => {
        return {
          renderTo: region.props.title,
          path: Region.getMyPortion(requestedLocation, region.props.routeFragment).result,
          regionProps: region.props
        };
      });
    } else {

      myRegions.push({
          renderTo : mainRegion.props.title,
          path : Region.getMyPortion(requestedLocation, mainRegion.props.routeFragment).result,
          regionProps : mainRegion.props
      });

      this.props.children.map((region) => {
        if (!region.props.main)
        myRegions.push({
          renderTo : region.props.title,
          regionProps : region.props
        })
      });


    }




    myRegions.forEach((route) => {

      let matchedRoute = findRoute(route.path,routesDeclaration.props.children);
      if (matchedRoute === undefined){
        console.warn(
          'Route ' + route.path + ' doesn\'t match any route.','You should try one of these :\n',
          React.Children.map(routesDeclaration.props.children.props.children, (child) => {
            return child.props.path;
          })
        );
      }

      if (matchedRoute) {
        let component = matchedRoute.original_route.props.component || false;

        this.Regions[route.renderTo] = {};
        this.Regions[route.renderTo].regionProps = route.regionProps;
        this.Regions[route.renderTo].location = requestedLocation;
        this.Regions[route.renderTo].component = React.createElement(component, {
          params : matchedRoute.params
        });
      }else{
        this.Regions[route.renderTo] = {};
        this.Regions[route.renderTo].regionProps = route.regionProps;
        this.Regions[route.renderTo].location = requestedLocation;
        this.Regions[route.renderTo].component = false;
      }
    });



    // this.props.children.forEach((region) => {
    //   if (!this.Regions[region.props.title]) {
    //     this.Regions[region.props.title] = {};
    //     this.Regions[region.props.title].component = false;
    //
    //   } else {
    //     this.Regions[region.props.title].regions = this.Regions;
    //   }
    // });


  }

  render() {
    return (<p style={{display:'none'}}></p>);
  }
};

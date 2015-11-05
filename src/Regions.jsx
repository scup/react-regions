
function checkMatch(location,route){
  var params = {}
  var original_route = route
  route = route.props.path                   .replace(/\|\|/,'|').split('/').filter((frag)=>frag !== '')
  var original_location = location = location.replace(/\|\|/,'|').split('/').filter((frag)=>frag !== '')

  var matchs = route.filter((frag,index)=>{
    var matched = (location[index] === frag || frag === '*' || frag.indexOf(':') !== -1)

      if (frag.indexOf(':') !== -1){
        params[frag.replace(':','')] = location[index]
      }


    return matched
  })

  if (matchs.length === route.length){
    if (original_route.props.children)
      return findRoute(original_location.join('/'),original_route.props.children)
    return {original_route,params}
  }
  return false

}


function findRoute(location,routes){
  if (!routes.filter)
    routes = routes.props.children


  var finalRoutes = routes.map((route)=>{
    return checkMatch(location,route)
  }).filter((route)=>route)[0]
  return finalRoutes
}












import React from 'react';
import ReactDOM from 'react-dom';
import Region from './Region.jsx';


import routesDeclaration from '../examples/routes.jsx';
import myRegions from '../examples/regions.jsx';

export default class Regions extends React.Component{
	getRegion(title){
		if (this.Regions[title])
		return this.Regions[title]
	}

	static fetch(views){
      if(this.prototype.cachedViews === undefined){
        this.prototype.cachedViews = ReactDOM.render(views,document.createElement('div'))
        this.prototype.cachedViews.reRender()
      }
      this.prototype.cachedViews.reRender()
      return this.prototype.cachedViews
	}


    constructor(){
      super()
      this.state = {

      }
      this.Regions = {}
    }

    reRender(){
            var mainView = this.props.children.filter((child)=>{
              return child.props.main
            })[0];

            var requestedLocation = (location.pathname+location.hash.replace('#','')+location.search).replace(/\/\//,'/')
            if (Region.checkMatch(requestedLocation,mainView.props.routeFragment)){


              var myRoutes = this.props.children.map((region)=>{
                  return {
                    renderTo : region.props.title,
                    path : Region.getMyportion(requestedLocation,region.props.routeFragment).result,
                    regionProps : region.props
                  }
              })


            }else{
              var myRoutes = []
              var mainRender = true
              myRoutes.push({
                  renderTo : mainView.props.title,
                  path : requestedLocation,
                  viewProps : mainView.props
              })

            }

            myRoutes.forEach((route)=>{

              var matchedRoute = findRoute(route.path,routesDeclaration.props.children);

              var component = matchedRoute.original_route.props.component || false

              this.Regions[route.renderTo] = {}
              this.Regions[route.renderTo].regionProps = route.regionProps
              this.Regions[route.renderTo].location = requestedLocation
              this.Regions[route.renderTo].component = React.createElement(component,{
                params : matchedRoute.params
              })

            })


            myRegions.props.children.forEach((region)=>{
              if (!this.Regions[region.props.title]){
                this.Regions[region.props.title] = {}
                this.Regions[region.props.title].component = <p></p>
            }else{
              this.Regions[region.props.title].views = this.Regions
            }
            })

    }


    render(){

      return (<p style={{display:'none'}}></p>);
    }
};

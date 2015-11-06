import React from 'react';

export default class Region extends React.Component{
  static propTypes = {
    regions: React.PropTypes.any,
    shouldRender: React.PropTypes.bool,
    title: React.PropTypes.string,
  }

  static checkMatch(url,portion){
  	portion = portion.split('/').filter((frag)=>frag !== '' && frag !== '@' && frag !== '*')
  	url = url.split('/').filter((frag)=>frag !== '')
  	return url.indexOf(portion[0]) !== -1
  }

  static getMyportion(url,portion,to){
    let acc = [];
    let indexes = [];
    portion = portion.split('/').filter((frag)=>frag !== '');
    let _originalUrl = url;
    url = url.split('/').filter((frag)=>frag !== '')

    let separators = portion.filter((frag)=>{
    	return frag !== '@' && frag !== '*'
    });

    let splittedUrl = url.join('/').split(separators[0]);
    let splittedPortion = portion.join('/').split(separators[0]);
    let finalUrl = '';
    splittedPortion.map(function (portion, index) {
    	if (portion.replace(/\//,'') === '@'){
    		finalUrl = splittedUrl[index];
    	}
    });

    let diff = _originalUrl.replace(finalUrl,'@');

    if (to !== undefined) {
    	diff = diff.replace('@',('/'+to+'/').replace(/\/\//,'/'));
    }
    return  {
    	result : finalUrl,
    	diff : diff.replace(/\/\//,'/')
    }
  }

  render() {
    if (this.props.shouldRender) {
    	let component = React.cloneElement(this.props.regions.getRegion(this.props.title).component, {
    		region: this.props.title,
    		regions: this.props.regions.Regions
	    });

    	return component;
    }
  }
}

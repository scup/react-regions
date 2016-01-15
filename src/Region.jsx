import React, { PropTypes } from 'react';

export default class Region extends React.Component {

  static ROUTE_SEPARATOR = '*****------*****';

  static propTypes = {
    regions: PropTypes.any,
    shouldRender: PropTypes.bool,
    title: PropTypes.string,
    history: PropTypes.shape({
      history: PropTypes.number,
      scrollRestoration: PropTypes.string,
      state: PropTypes.any
    })
  };

  static checkMatch(url, portion) {
    portion = portion.split('/').filter((frag)=>frag !== '' && frag !== '@' && frag !== '*');
    url = url.split('/').filter((frag)=>frag !== '');
    return url.indexOf(portion[0]) !== -1;
  }

  static getSeparators(pattern) {
    if (!Array.isArray(pattern))
      pattern = pattern.split('/').filter((frag)=>frag !== '');
    return pattern.filter(function (frag) {
      return frag.indexOf('*') === -1 && frag.indexOf('@') === -1;
    });
  }

  static serializeRoute(url, separators) {
    return url.split('/').map((frag)=> {
      if (separators.indexOf(frag) !== -1)
        return this.ROUTE_SEPARATOR + frag + this.ROUTE_SEPARATOR;
      return frag;
    })
      .join('/').split(this.ROUTE_SEPARATOR);
  }

  static getLinkTo(url, pattern, to) {
    pattern = pattern.split('/').filter((frag)=>frag !== '');
    url = url.split('/').filter((frag)=>frag !== '').join('/');
    let finalUrl;
    let separators = this.getSeparators(pattern);
    let serializedRoute = this.serializeRoute(url, separators);

    if (serializedRoute.length >= pattern.length)
      return serializedRoute.map((frag, index)=> {
        if (pattern[index] === '@')
          return to;
        return frag;
      }).join('/').replace(/\/\//gmi, '/');

    finalUrl = pattern.map((frag, index)=> {
      if (frag === '*') {
        return serializedRoute[index];
      }

      if (frag === '@') {
        return to;
      }

      return frag;

    }).filter((frag) => frag !== undefined);

    return this.removeTrailingSeparators(finalUrl, separators).join('/').replace(/\/\//g, '/');

  }

  static removeTrailingSeparators(url, separators) {
    if (separators.indexOf(url[0]) !== -1) {
      url.shift();
    }
    if (separators.indexOf(url[url.length - 1]) !== -1) {
      url.pop();
    }
    return url;
  }

  static getMyPortion(url, pattern) {
    let finalUrl;

    pattern = pattern.split('/').filter((frag)=>frag !== '');
    let separators = this.getSeparators(pattern);
    url = url.split('/').filter((frag)=>frag !== '').join('/');

    this.serializeRoute(url, separators).map((frag, index)=> {
      if (pattern[index] === '@')
        finalUrl = frag;
    });

    return finalUrl;
  }

  static removePortion(url, pattern) {
    let finalUrl;
    pattern = pattern.split('/').filter((frag)=>frag !== '');
    let separators = this.getSeparators(pattern);
    url = url.split('/').filter((frag)=>frag !== '').join('/');

    finalUrl = this.serializeRoute(url, separators)
      .reduce((acc, frag, index)=> {
        if (pattern[index] === '@') return acc;
        acc.push(frag);
        return acc;
      }, []);

    return this.removeTrailingSeparators(finalUrl, separators);
  }

  render() {

    if (this.props.shouldRender) {

      let component = this.props.regions.getRegion(this.props.title).component;

      if (component) {
        let regions = this.props.regions.regions;

        Object.keys(regions).forEach((key) => {
          regions[key].history = this.props.history;
        });

        component = React.cloneElement(regions[this.props.title].component, {
          region: regions[this.props.title],
          regions: regions
        });
      } else {
        component = null;
      }

      return component;
    }
  }
}

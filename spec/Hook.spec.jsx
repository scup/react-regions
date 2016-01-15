import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Hook from '../src/Hook.jsx';
import Region from '../src/Region.jsx';

// var element = TestUtils.renderIntoDocument(<Hook to="/two/teste" region={region}/>);
describe('Hook Module ', function () {

  xit('should include the auxiliar fragment to url',function(){
    //Given
    const region = {
        location: '/one/teste/aux/one/teste',
        regionProps: { routeFragment: '@/aux/*' }
      };

    const location = '/one/teste';
    spyOn(Region, "getLinkTo").and.returnValue('#one/teste/aux/one/teste///////////');

    window.location.hash = '#one/teste/';
    //When
    Hook.go(region, location);

    //Then
    expect(window.location.hash).toEqual('#one/teste/aux/one/teste/');
    expect(Region.getLinkTo).toHaveBeenCalledWith(region.location, region.regionProps.routeFragment, location);
  });

  xit('should remove the auxiliar fragment from url',function(){
    //Given
    let region = {
        location: '/one/teste/aux/one/teste',
        regionProps: { routeFragment: '*/aux/@' }
      };

    window.location.hash = '/one/teste/aux/one/teste';
    //When
    Hook.close(region)

    //Then
    expect(window.location.hash).toEqual('#one/teste/')
  });

});

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Regions from '../src/Regions.jsx';

describe('Region Module ', function () {

  xit('should return true to checked match',function(){
    //Given
    var element = TestUtils.renderIntoDocument(<Regions/>);

    var location = "one/teste/",
        route = {
          props: {
            path: "one/:paramOfOne/*"
          }
        }
    //When

    console.log( element.checkMatch );
    var checked = element.checkMatch(location, route);
    //Then
    expect(checked).toEqual(true);
  })

});

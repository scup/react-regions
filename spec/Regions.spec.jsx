import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Regions from '../src/Regions.jsx';

describe( 'Regions module', function () {

  let element;

  beforeEach( function() {
    element = TestUtils.renderIntoDocument(<Regions/>);
  });

  it( 'Should separate path by array index and remove separators', function () {
    //Given
    let path = "one/:paramOfOne/*";
    //When
    path = Regions._splitPath(path);
    //Then
    expect(path).toEqual(['one', ':paramOfOne', '*']);
  } );

  describe( 'evaluating _getMatchedRoute', function() {

    it( 'Should return object if it matches', function () {
      //Given
      let location = "one/teste/",
          route = { props: {
            path: "one/:teste/*"
          }};
      let expected =
        { originalRoute: {
            props: { path: "one/:teste/*" }
          },
          params: { teste: "teste"}
        };
      //When
      let matched = Regions._getMatchedRoute(location, route);
      //Then
      expect(expected).toEqual(matched);
    });

    xit( 'Should return undefined if it does not matches', function () {
      //Given
      let location = "one/teste/",
          route = { props: {
            path: "one/:teste/*"
          }};
      let expected =
        { originalRoute: {
            props: { path: "one/:teste/*" }
          },
          params: { teste: "teste"}
        };
      //When
      let matched = Regions._getMatchedRoute(location, route);
      //Then
      expect(undefined).toEqual(matched);
    });
  });
});

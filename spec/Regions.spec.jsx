import ReactDOM from 'react-dom';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Region from '../src/Region.jsx'
import Regions from '../src/Regions.jsx';
import Route from 'react-router';

import Faker from 'faker';

class One extends React.Component {
  render(){
    return (<div />)
  }
}

class Two extends React.Component {
  render(){
    return (<div />)
  }
}

describe( 'Regions module', function () {
  let element, region, regionAux, routesMock;

  beforeEach( function() {
    region = (<Region title="main" key="main" main routeFragment="@/aux/*"/>),
    regionAux = (<Region title="aux" key="aux"  routeFragment="*/aux/@"/>),
    element = TestUtils.renderIntoDocument(<Regions>{[region, regionAux]}</Regions>),
    routesMock = {
         props: {
           children: [
             {
               props: {
                 path: 'one/:paramOfOne/*'
               }
             },
             {
               props: {
                 path: 'two/:paramOfTwo/*'
               }
             }
           ]
         }
       };
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

    it( 'Should return undefined if it does not matches', function () {
      //Given
      let location = "one/teste/",
          route = { props: {
            path: "one/:teste/*/aux"
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

  it('should return create a regions instance and call refresh method', function() {
    //Given
        const region = (<Region title="main" key="main" main routeFragment="@/aux/*"/>),
          regions = (<Regions>{[region]}</Regions>);

    Regions.prototype.cachedView = undefined;
    spyOn(Regions.prototype, "refresh");
    //When
    var fetchCheck = Regions.fetch( regions, routesMock );
    //Then
    expect(Regions.prototype.cachedView).not.toBeUndefined();
    expect(Regions.prototype.refresh).toHaveBeenCalled();
  });

  describe(' - refresh - ', function(){
    const ramdomParamOne = Faker.lorem.words()[0];
    const ramdomParamTwo = Faker.lorem.words()[1];
    const pathOne = `${ramdomParamOne}/:paramOfOne/*`;
    const pathTwo = `${ramdomParamTwo}/:paramOfTwo/*`;
    const routeToOne = <Route path={pathOne} component={One}/>;
    const routeToTwo = <Route path={pathTwo} component={Two}/>;
    const router = (
      <div>
      <Route path="/">{[routeToOne, routeToTwo]}</Route>
      </div>
    );

    it('should set a component to main region with props and undefined to aux region', function(){
      //Given
      window.location.hash = `#/${ramdomParamOne}/teste/`;
      //When
      element.refresh( router );
      const main = element.regions.main;
      const aux = element.regions.aux;

      //Then - MAIN
      expect( TestUtils.isElementOfType(main.component, One) ).toBeTruthy();
      expect( main.regionProps.routeFragment ).toBe( '@/aux/*' );
      expect( main.regionProps.title ).toBe( 'main' );
      expect( main.location ).toBe( `/${ramdomParamOne}/teste/` );
      expect( main.component.props.params.paramOfOne ).toBe( 'teste' );

      //Then - AUX
      expect( aux.component ).toBe( false );
      expect( aux.location ).toBe( `/${ramdomParamOne}/teste/` );
      expect( aux.regionProps.routeFragment ).toBe( '*/aux/@' );
      expect( aux.regionProps.title ).toBe( 'aux' );
    });

    it('should set a component to main region and to aux region, both with props', function(){
      //Given
      window.location.hash = `#/${ramdomParamTwo}/teste/aux/${ramdomParamOne}/teste2`;
      //When
      element.refresh( router );
      const main = element.regions.main;
      const aux = element.regions.aux;

      //Then - MAIN
      expect(TestUtils.isElementOfType(main.component, Two)).toBeTruthy();
      expect( main.location ).toBe( `/${ramdomParamTwo}/teste/aux/${ramdomParamOne}/teste2` );
      expect( main.component.props.params.paramOfTwo ).toBe( 'teste' );
      expect( main.regionProps.routeFragment ).toBe( '@/aux/*' );
      expect( main.regionProps.title ).toBe( 'main' );

      //Then - AUX
      expect(TestUtils.isElementOfType(aux.component, One)).toBeTruthy();
      expect( aux.location ).toBe( `/${ramdomParamTwo}/teste/aux/${ramdomParamOne}/teste2` );
      expect( aux.component.props.params.paramOfOne ).toBe( 'teste2' );
      expect( aux.regionProps.routeFragment ).toBe( '*/aux/@' );
      expect( aux.regionProps.title ).toBe( 'aux' );
    });
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import Regions from '../src/Regions.jsx';
import Region from '../src/Region.jsx';

const regionDefinition = [
  <Region title="main" key="main" main routeFragment="@/aux/*" />,
  <Region title="aux" key="aux" routeFragment="*/aux/@" />
];

export default (
  <Regions>{ regionDefinition }</Regions>
);

import React from 'react';
import ReactDOM from 'react-dom';
import Regions from '../src/Regions.jsx';
import Region from '../src/Region.jsx';

export default (
  <Regions>
    <Region title="main" main routeFragment="@/aux/*" />
    <Region title="aux" routeFragment="*/aux/@" />
  </Regions>
);

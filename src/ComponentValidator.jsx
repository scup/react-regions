import React from 'react';

export default {
  onlyComponentsOf: function (type) {
    return function (props, propName, componentName) {
      const components = React.Children.toArray(props[propName]);

      for (let component of components) {
        if (component.type !== type) {
          return new Error(`${componentName} should be an instance of ${type.name}`);
        }
      }
    };
  }
};

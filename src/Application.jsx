import React from 'react';
import Regions from './Regions';
import Region from './Region';

export default class Application extends React.Component {
	constructor() {
		super();
		this.state = { children: null };
	}

	findView(node, regions) {
		let resultArray = React.Children.map(node.props.children, (child) => {
			if (child.type !== Region){
				if (child.props.children){
					return React.cloneElement(child, {
						children : this.findView(child,regions)
					});
				}

				return React.cloneElement(child, {
					children: this.findView(child, regions)
				});
			} else {
				return React.cloneElement(child, {
					shouldRender: true,
					regions: regions,
					history: this.props.routes.props.history
				});
			}
		});

		if (Array.isArray(resultArray)) {
			if (resultArray.length === 1){
				return resultArray[0]
			}
		}

		return resultArray;
	}

	componentWillMount() {
		let regions = Regions.fetch(this.props.regions, this.props.routes);
		this.setState({ children: this.findView(this, regions) });
	}

	componentWillReceiveProps() {
		let regions = Regions.fetch(this.props.regions, this.props.routes);
		this.setState({ children : this.findView(this, regions) });
	}

  render() {
    return this.state.children;
  }
}

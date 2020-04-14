import React, { Component } from 'react';

class Company extends Component{
	render(){
		const {name} = this.props
		const {id} = this.props
		return (
			<div>
				{name}
			</div>
		);
	}
}
export default Company;
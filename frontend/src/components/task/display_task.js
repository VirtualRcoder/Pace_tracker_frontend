import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

class Company extends Component{
	constructor(props){
		super(props);
	}


	render(){
		const {project} = this.props
		const {name} = this.props
		const {description} = this.props
		const {deadline} = this.props
		const {modified} = this.props

		return (
			<Jumbotron style={{backgroundColor:"lightgreen"}}>
				<Jumbotron>
					<u>Name</u>:-&nbsp;{name}<br/>
					<u>Modified at</u>:-&nbsp;{modified}<br/><br/>
					<u>Description</u>:- &nbsp;{description}<br/>
					<u>Deadline</u>:- &nbsp;{deadline}
				</Jumbotron>
			</Jumbotron>
		);
	}
}
export default Company;
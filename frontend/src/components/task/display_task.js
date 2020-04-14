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
					Modified at:-&nbsp;{modified}<br/>
					Name:-&nbsp;{name}<br/>
					Project:-&nbsp;{project}<br/><br/>
					Description:- &nbsp;{description}<br/>
					Deadline:- &nbsp;{deadline}
				</Jumbotron>
			</Jumbotron>
		);
	}
}
export default Company;
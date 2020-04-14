import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

class Company extends Component{
	constructor(props){
		super(props);
	}


	render(){
		const {project} = this.props
		const {done} = this.props
		const {next} = this.props
		const {blocking} = this.props
		const {note} = this.props
		const {modified} = this.props

		return (
			<Jumbotron style={{backgroundColor:"lightgreen"}}>
				<Jumbotron>
					Modified at:- &nbsp;{modified}<br/>
					Project:- &nbsp;{project}<br/><br/>
					What is done:- &nbsp;{done}<br/>
					What is next:- &nbsp;{next}<br/>
					What is blocking:- &nbsp;{blocking}<br/><br/>
					Note:- &nbsp;{note}
				</Jumbotron>
			</Jumbotron>
		);
	}
}
export default Company;
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
		const {created_by} = this.props

		return (
			<Jumbotron style={{backgroundColor:"lightgreen"}}>
				<Jumbotron>
					<u>Modified at</u>:- &nbsp;{modified}<br/>
					<u>Created By</u>:- &nbsp;{created_by}<br/><br/>
					<u>What is done</u>:- &nbsp;{done}<br/>
					<u>What is next</u>:- &nbsp;{next}<br/>
					<u>What is blocking</u>:- &nbsp;{blocking}<br/><br/>
					<u>Note</u>:- &nbsp;{note}
				</Jumbotron>
			</Jumbotron>
		);
	}
}
export default Company;
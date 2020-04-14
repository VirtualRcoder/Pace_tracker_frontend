import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

class Company extends Component{
	constructor(props){
		super(props);
	}


	render(){
		const {project} = this.props
		const {task} = this.props
		const {time_period} = this.props
		const {comment} = this.props
		const {modified} = this.props

		return (
			<Jumbotron style={{backgroundColor:"lightgreen"}}>
				<Jumbotron>
					Modified at:-&nbsp;{modified}<br/>
					Project:-&nbsp;{project}<br/><br/>
					Task:- &nbsp;{task}<br/>
					Time Period:- &nbsp;{time_period}<br/>
					Comment:- &nbsp;{comment}
				</Jumbotron>
			</Jumbotron>
		);
	}
}
export default Company;
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
		const {created_by} = this.props

		return (
			<Jumbotron style={{backgroundColor:"lightgreen"}}>
				<Jumbotron>
					<u>Modified at</u>:-&nbsp;{modified}<br/>
					<u>Created_by</u>:-&nbsp;{created_by}<br/><br/>
					<u>Task</u>:- &nbsp;{task}<br/>
					<u>Time Period</u>:- &nbsp;{time_period}<br/>
					<u>Comment</u>:- &nbsp;{comment}
				</Jumbotron>
			</Jumbotron>
		);
	}
}
export default Company;
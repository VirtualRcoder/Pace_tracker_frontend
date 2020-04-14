import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';

import ProjectMember from '../manage_members/find_members/project_members';

class projectPage extends Component{
	constructor(props){
		super(props);
	}

	render(){
    const id = this.props.location.state.id
    const name= this.props.location.state.name
    const total_budget= this.props.location.state.total_budget
    const budget_spent= this.props.location.state.budget_spent
    const deadline= this.props.location.state.deadline
    const company = this.props.location.state.company

		return (
			<div>
				<h1><Badge variant="success">MY PROJECT PAGE</Badge></h1>
				<br/>
		        <Jumbotron>
             NAME OF PROJECT:&nbsp;{name}<br/>
             Company of project:&nbsp;{company}<br/>
             total_budget:&nbsp;{total_budget}<br/>
             budget_spent:&nbsp;{budget_spent}<br/>
             deadline:&nbsp;{deadline}  
             <Jumbotron>
               MEMBERS:
               <ProjectMember id={id}/>
             </Jumbotron>  
       			</Jumbotron>    

			</div>
		);
	}
}
export default projectPage;



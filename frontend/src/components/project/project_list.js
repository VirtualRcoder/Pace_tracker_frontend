import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';

class project extends Component{
	constructor(props){
		super(props);
		this.projectpage = this.projectpage.bind(this)
	}

	projectpage(){
		const id = this.props.id
		const name = this.props.name
		const total_budget = this.props.total_budget
		const budget_spent = this.props.budget_spent
		const deadline = this.props.deadline
		const company = this.props.company
		const role = this.props.role
		
		if(role=="regular")
			this.props.routes.history.push({pathname:"/rp", state:{id,name,total_budget,budget_spent,deadline,company}})
		else if(role=="client")
			this.props.routes.history.push({pathname:"/cp", state:{id,name,total_budget,budget_spent,deadline,company}})
		else
			this.props.routes.history.push({pathname:"/pp", state:{id,name,total_budget,budget_spent,deadline,company}})
	}

	render(){
		const {name} = this.props

		return (
			<div>
				<Button size="lg" block onClick={this.projectpage}>{name}</Button>
			</div>
		);
	}
}
export default project;
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Company extends Component{
	constructor(props){
		super(props);
		this.pro = this.pro.bind(this)
	}

	pro(){
	    let company_id = this.props.id
	    let company=this.props.name
	    let companies= this.props.companies
	    let role = this.props.role

	    if(window.localStorage.getItem("is_staff")==="true"){
	    	this.props.routes.history.push({pathname:"/padmin", state:{company_name:{company},company_id:{company_id},companies}})
	    }
	    else{
	      this.props.routes.history.push({pathname:"/p",state:{company_name:{company},company_id:{company_id},companies,role}})
	    }
	}


	render(){
		const {name} = this.props
		const {id} = this.props
		const button={
			backgroundColor: "#94F499",
  			color: "black",
  			border: "2px solid #80ff00",
		};
		return (
			<div>
				<Button  variant="success" size="lg" block onClick={this.pro}>{name}</Button>
			</div>
		);
	}
}
export default Company;
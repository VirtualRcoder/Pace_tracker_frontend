import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';

class Company extends Component {
//Constructor
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.state = {
			name: null,
			company: null,
			total_budget: null,
			budget_spent: null,
			deadline: null,
		}
	}
//Handle the Default Input behaviour
	handleInputChange(event){
		event.preventDefault()
		let key= event.target.name
		let value= event.target.value

		this.setState({
			[key]: value
		})

		key = "company"
		value = this.props.location.state.company_id
		this.setState({
			[key]: value
		})

	}
//Handle the Default Output behaviour
	handleSubmit(event){
		event.preventDefault()
		let data= this.state
		console.log(data)
		this.Login(data)
	}
//Login Taking Place	
	Login(data){
		const endpoint = 'http://127.0.0.1:8000/api/projects'
		const csrfToken = cookie.load('csrftoken')
	    let com = this
	    let company = this.props.location.state.company
	    let company_id = this.props.location.state.company_id

	    if(csrfToken !== undefined){
          let token = window.localStorage.getItem('token')
          let lookupOptions1 = {
            method: "POST",
            headers: {'Content-Type': 'application/json','X-CSRFToken': csrfToken,
            "Authorization":`Token ${token}`},
            body: JSON.stringify(data),
		    credentials: 'include'
          }

          fetch(endpoint, lookupOptions1)
          .then(function(response){return response.json()})
          .then(function(responseData){
            console.log(responseData)
            if(window.localStorage.getItem("is_staff")=="true")
            	com.props.history.push({pathname:"/padmin",state:{company_name:{company},company_id:{company_id}}})
            else
            	com.props.history.push({pathname:"/p",state:{company_name:{company}}})
          })
        }
      }
  

//Rendering Output	
	render(){
		const inputStyle={
			borderRadius:50,
			backgroundColor: "lightgreen",
			alignText: "center",
			width:"400px",
			height:"50px",
			boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",

		};

		const logo={
			background:"#00ff00",
			height:"60px"
		};

		const heading={
			fontSize:"35px",
			color:"green",
		};

		const girlimg= {
			float:"right",
			width:"10%",
		};

   	return(
   		<div className="container">
   		<br/>
   			<center>
	   		<form onSubmit={this.handleSubmit}>
		      	<div>
		      		<input style={ inputStyle } id="name" type="text" name="name" className="form-control" placeholder="Enter Name" onChange={this.handleInputChange} required="true"/>
		      		<br/>
		      		<input style={ inputStyle } id="company" type="text" name="company" value={this.props.location.state.company} className="form-control" placeholder="Enter company" onChange={this.handleInputChange}/>
		      		<br/>
		      		<input style={ inputStyle } id="total_budget" type="text" name="total_budget" className="form-control" placeholder="Enter total_budget" onChange={this.handleInputChange} required="true"/>
		      		<br/>
		      		<input style={ inputStyle } id="budget_spent" type="text" name="budget_spent" className="form-control" placeholder="Enter budget_spent" onChange={this.handleInputChange} required="true"/>
		      		<br/>
		      		<input style={ inputStyle } id="deadline" type="text" name="deadline" className="form-control" placeholder="Enter deadline" onChange={this.handleInputChange} required="true"/>
		      		<br/>
		      	</div><br/><br/>
				<button>Create</button>
				<br/>
			</form>
	      	</center>
	    </div>  	
      )  
   }
}

export default Company;
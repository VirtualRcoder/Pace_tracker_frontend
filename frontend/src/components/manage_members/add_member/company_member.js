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
			company: null,
    		member: null,
    		inviter: null,
    		role: null,
    		hourly_rate: "",
    		email:null,
    		companies:[],
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

		if(key == "member"){
			key = "email"
			this.setState({
				[key]: value
			})
		}
		key = "inviter"
		value = window.localStorage.getItem('id')
		this.setState({
			[key]: value
		})

	}
//Handle the Default Output behaviour
	handleSubmit(event){
		event.preventDefault()
		let data= this.state
		this.Login(data)
	}
//Login Taking Place	
	Login(data){
		const endpoint = 'http://127.0.0.1:8000/api/company_memberships'
		const endpoint1 = 'http://127.0.0.1:8000/api/users/get_user_by_email'

		const csrfToken = cookie.load('csrftoken')
	    let com = this

	    if(csrfToken !== undefined){
	      let token = window.localStorage.getItem('token')
	      let lookupOptions1 = {
	        method: "POST",
	        headers: {'Content-Type': 'application/json','X-CSRFToken': csrfToken,
	        "Authorization":`Token ${token}`},
	        body: JSON.stringify(data),
		    credentials: 'include'
	      }
	      
	      fetch(endpoint1, lookupOptions1)
	      .then(function(response){return response.json()})
	      .then(function(responseData){
	        console.log(responseData)
	        if(responseData.id){
	        	com.setState({["member"]:responseData.id})
	        	data = com.state
	        	lookupOptions1 = {
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

	//            if(window.localStorage.getItem("is_staff")=="true")
	//           	com.props.history.push({pathname:"/mm"})
	//         else
	 //       	com.props.history.push({pathname:"/mm"})
	          })
			}        
	      })
	    }
    }
  
companies(){
	const endpoint2 = 'http://127.0.0.1:8000/api/companies'
	const csrfToken = cookie.load('csrftoken')

   if(csrfToken !== undefined){
	    let com = this
        let token = window.localStorage.getItem('token')

	    let lookupOptions2 = {
	      method: "GET",
	      headers: {'Content-Type': 'application/json','X-CSRFToken': csrfToken,
	      "Authorization":`Token ${token}`},
	    }

	    fetch(endpoint2, lookupOptions2)
	    .then(function(response){return response.json()})
	    .then(function(responseData){
	       com.setState({
	        companies: responseData.results,
	      })
	    })
    }
}      

componentDidMount(){
	this.companies()
}
  

//Rendering Output	
	render(){
		const {companies} = this.state
		const {company} = this.state
		const {role} = this.state

		const inputStyle={
			borderRadius:50,
			backgroundColor: "lightgreen",
			alignText: "center",
			width:"400px",
			height:"50px",
			boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",

		};

		const selectStyle={
			border:"None",
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
					<select	value={company} name="company" style={selectStyle} onChange={this.handleInputChange}>
			      		<option name="company" value="select">Select Company Name</option>
		        		{companies.length > 0 ? companies.map((companiesitem, index) =>{
			              return(
		                		<option name="company" value={companiesitem.id}>{companiesitem.name}</option>
		        	      )    
			        	}): <p>Not found</p>}
		        	</select>
		        	<br/><br/>
		      		<input style={ inputStyle } id="member" type="text" name="member" className="form-control" placeholder="Enter member" onChange={this.handleInputChange} required="true"/>
		      		<br/>

		      		<input style={ inputStyle } id="inviter" type="text" name="inviter" value={window.localStorage.getItem("email")} className="form-control" placeholder="Enter inviter" onChange={this.handleInputChange} required="true"/>
		      		<br/><br/>

					<select	value={role} name="role" style={selectStyle} onChange={this.handleInputChange}>
			      		<option name="role" value="select">Select Role</option>
			      		<option name="role" value="admin">Admin</option>
			      		<option name="role" value="regular">Regular</option>
			      		<option name="role" value="client">Client</option>	
			      	</select>
			      	<br/><br/>

			      	<input style={ inputStyle } id="hourly_rate" type="text" name="hourly_rate" className="form-control" placeholder="Enter hourly_rate" onChange={this.handleInputChange} required="true"/>
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
import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';


class newTeam extends Component {
//Constructor
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.state = {
			name: null,
			created_by:null,
			company:null,
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


		key = "created_by"
		value = window.localStorage.getItem('id')
		console.log(value)
		this.setState({
			[key]: value
		})

	}
//Handle the Default Output behaviour
	handleSubmit(event){
		event.preventDefault()
		let data= this.state
		console.log(data)
			    let com = this
	    let company = this.props.location.state.company
	    let company_id = this.props.location.state.company_id
	    let companies = this.props.location.state.companies
            	com.props.history.push({pathname:"/padmin",state:{company_name:{company},company_id:{company_id},companies}})
//		this.Login(data)
	}
//Login Taking Place	
	Login(data){
		const endpoint = 'http://127.0.0.1:8000/api/teams'
		const csrfToken = cookie.load('csrftoken')

	    let com = this
	    let company = this.props.location.state.company
	    let company_id = this.props.location.state.company_id
	    let companies = this.props.location.state.companies

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
            	com.props.history.push({pathname:"/padmin",state:{company_name:{company},company_id:{company_id},companies}})
            else
            	com.props.history.push({pathname:"/p",state:{company_name:{company}}})
          })
        }
      }
  

//Rendering Output	
	render(){
		const companies= this.props.location.state.companies

   		const {company} = this.state

		const inputStyle={
			borderRadius:50,
			backgroundColor: "lightgreen",
			alignText: "center",
			width:"400px",
			height:"50px",
			boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",

		};

		const selectStyle={
			borderRadius:50,
			backgroundColor: "lightgreen",
			alignText: "center",
			width:"400px",
			height:"50px",
			boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
			border:"None",			
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
		      		<select	value={company}	name="company" style={selectStyle} onChange={this.handleInputChange}>
		      		<option name="company" value="select">Select company Name</option>
	        		{companies.length > 0 ? companies.map((companiesitem, index) =>{
		              return(
	                		<option name="company" value={companiesitem.id}>{companiesitem.name}</option>
	        	      )    
		        	}): <p>Not found</p>}
		        	</select>
		        	<br/><br/>
		        	<input style={ inputStyle } id="created_by" type="text" name="created_by" value={window.localStorage.getItem("email")} className="form-control" placeholder="Created_by" onChange={this.handleInputChange}/>
		      	</div><br/><br/>
				<button>Create</button>
				<br/>
			</form>
	      	</center>
	    </div>  	
      )  
   }
}

export default newTeam;
import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

class displayProjectMember extends Component{
	constructor(props){
		super(props);
		this.pro = this.pro.bind(this)
	}

	state={
		member:[],
	}

	pro(){
	    const id = this.props.id
	    const endpoint1 = 'http://127.0.0.1:8000/api/users/'+`${id}`

	    const csrfToken = cookie.load('csrftoken')
	    let com = this

	    if(csrfToken !== undefined){
	      let token = window.localStorage.getItem('token')
	      let lookupOptions1 = {
	        method: "GET",
	        headers: {'Content-Type': 'application/json','X-CSRFToken': csrfToken,
	        "Authorization":`Token ${token}`},
	      }

	      fetch(endpoint1, lookupOptions1)
	      .then(function(response){return response.json()})
	      .then(function(responseData){
	      	com.setState({member:responseData.email,})
	      })
    	}  
	}

    componentDidMount(){
      this.pro()
    }  
	render(){
		return (
			<div>
				{this.state.member}
			</div>	
		);
	}
}
export default displayProjectMember;
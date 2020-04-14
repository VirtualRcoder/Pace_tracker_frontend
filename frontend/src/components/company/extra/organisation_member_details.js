import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';
import Compa from './company';


class Company extends Component{

	constructor(props){
		super(props);
		this.call = this.call.bind(this)
    this.state = {
      name:"",
    }
	}

	call(){
    const id = this.props
		let op = 'http://127.0.0.1:8000/api/companies/'+`${id.id}`
		const csrfToken = cookie.load('csrftoken')

    let com = this

    if(csrfToken !== undefined){
      let token = window.localStorage.getItem('token')
      let lookupOptions1 = {
        method: "GET",
        headers: {'Content-Type': 'application/json','X-CSRFToken': csrfToken,
        "Authorization":`Token ${token}`},
      }
      fetch(op, lookupOptions1)
      .then(function(response){return response.json()})
      .then(function(responseData){
        com.setState({
          name:responseData.name
        })
      })
    }
  }  
    componentDidMount(){
      this.call()
    }  

	render(){
    const {name} = this.state
		return (
			<div>
				<Compa name={name}/>
			</div>
		);
	}
}
export default Company;
import React, {Component} from 'react'
import cookie from 'react-cookies'
import 'whatwg-fetch'
import Company from'./company';
import Company_membership from'./organisation_member_details';

export default class Dashboard extends Component{
	  state = {
    companies : [],
  }

 loadme(){
    const endpoint1 = 'http://127.0.0.1:8000/api/company_memberships'
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
        console.log(responseData.results)
        com.setState({
          companies: responseData.results,
        })
      })
    }
  }

  componentDidMount(){
    this.setState({
      companies: [],
    })
    this.loadme()
  }
  
	render(){
    const {companies} = this.state

    return(
      <div>
        {companies.length > 0 ? companies.map((companiesitem, index) =>{
            return(
                <Company_membership id ={companiesitem.company}/>  
            )
        }): <p>Not found</p>}
      </div>
      );
  }
}      

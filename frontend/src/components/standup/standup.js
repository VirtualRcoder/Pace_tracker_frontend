import React, { Component } from "react";
import cookie from 'react-cookies';
import 'whatwg-fetch';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Standup from './display_standup';

class App extends Component {
    constructor(props){
    super(props);
  }

  state = {
    standups : [],
  }


  displayStandup(){
    const endpoint1 = 'http://127.0.0.1:8000/api/standups'
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
         com.setState({
          standups: responseData.results,
        })
         console.log(com.state)
      })
    }
  }

  componentDidMount(){
    this.setState({
      standups: [],
    })
    this.displayStandup()
  }


  render(){
    const {standups} = this.state
    const local_company= window.localStorage.getItem('email')

    return(
      <div className="container">
      <br/>
        <Jumbotron style={{backgroundColor:"#FF6666"}}>
          <center>
            <h1><Badge variant="dark">STANDUPS</Badge></h1>
          </center>
        </Jumbotron>
        	{
        		standups.length > 0 ? standups.map((standupsitem, index) =>{
		            if(standupsitem.created_by == local_company)
		            {
		              return(
                    <Standup project={standupsitem.project} next={standupsitem.what_is_next} done={standupsitem.what_is_done} blocking={standupsitem.what_is_blocking} note={standupsitem.note} modified={standupsitem.modified_at}/>
                  )
		            }
        		}): <p>Not found</p>
        	}    
      </div>
      );
  }
}      


export default App;

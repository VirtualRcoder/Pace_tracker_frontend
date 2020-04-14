import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Member from '../display_members/team_member';

class teamMember extends Component{
  constructor(props){
    super(props);
  }

  state={
    members:[],
  }

  displayteam_members(){
    const endpoint1 = 'http://127.0.0.1:8000/api/team_memberships'
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
          members: responseData.results,
        })
      })
    }  
  }

  componentDidMount(){
    this.setState({
      members: [],
    })
    this.displayteam_members()
  }

  render(){

    const {members} = this.state
    const team = this.props.id
    return (
      <div>
        {
          members.length > 0 ? members.map((membersitem, index) =>{
              if(membersitem.team==team)
                {
                  return(<Member id={membersitem.member}/>)
                }
              }): <p>Not found</p>
        }
      </div>
    );
  }
}
export default teamMember;

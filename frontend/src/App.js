import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import User_Member_company from './components/company/normal_company';

import Home from './Home.js';
import Login from './Login.js';
import Register from './register.js';

import Dashboard from './components/dashboard.js';
import Dashboard1 from './components/normal_Dashboard';

import mycompany from './components/company/company';
import Create_Company from './components/company/New_Company';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import user from './components/me/me';
import edit_user from './components/me/edit_me';
import Logout from './Logout';

import Puser from './components/company_page/puser';
import Padmin from './components/company_page/padmin';

import Create_Project from './components/project/New_Project';
import Project_Page from './components/project/project_page';
import Client_Page from './components/project/client_page';

import Standup from './components/standup/standup';
import Create_Standup from './components/standup/New_Standup';

import Timesheet from './components/time_entry/timesheet';
import Create_Time_Entry from './components/time_entry/New_Time_Entry';

import Create_Task from './components/task/New_Task';
import Task from './components/task/task';

import Team from './components/team/New_Team';

import Manage_members from './components/manage_members/manage_members';
import Company_member from './components/manage_members/add_member/company_member';
import Project_member from './components/manage_members/add_member/project_member';
import Team_member  from './components/manage_members/add_member/team_member';

class App extends Component {
	constructor(props){
		super(props);
	}

  render(){
    return(
      <div>
      <Router>
      	<Route exact path="/"  
      	render={props => (<Home {...props}/>)}
      	/>
        <Route exact path="/ut" component={User_Member_company}/>        

      	<Route exact path="/l" component={Login}/>
        <Route exact path="/lo" component={Logout}/>
      	<Route exact path="/r" component={Register}/>

      	<Route exact path="/d" component={Dashboard}/>
        <Route exact path="/d1" component={Dashboard1}/>        

        <Route exact path="/lc" component={mycompany}/>
        <Route exact path="/nc" component={Create_Company}/>

        <Route exact path="/u" component={user}/>
        <Route exact path="/e" component={edit_user}/>

        <Route exact path="/p" component={Puser}/>
        <Route exact  path="/padmin" component={Padmin}/>

        <Route exact path="/np" component={Create_Project}/>
        <Route exact path="/pp" component={Project_Page}/>
        <Route exact path="/cp" component={Client_Page}/>

        <Route exact path="/s" component={Standup}/>
        <Route exact path="/ns" component={Create_Standup}/>

        <Route exact path="/t" component={Timesheet}/>
        <Route exact path="/nt" component={Create_Time_Entry}/>

        <Route exact path="/nta" component={Create_Task}/>
        <Route exact path="/ta" component={Task}/>

        <Route exact path="/nte" component={Team}/>

        <Route exact path="/mm" component={Manage_members}/>
        <Route exact path="/ncm" component={Company_member}/>
        <Route exact path="/npm" component={Project_member}/>
        <Route exact path="/ntm" component={Team_member}/>
      </Router>  
      </div>
      );
  }
}      


export default App;

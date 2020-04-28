import React, { Component } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

class User extends Component{
	render(){
		const {first_name} = this.props
		const {last_name} = this.props
		const {email} = this.props
		const {image} = this.props

		const img_style={
			height:"110px",
		};

		return (
			<div>
                <center>
                <img src={image} style={img_style}alt="" class="img-rounded img-responsive"/>
                </center><br/>
            	<div class="col-sm-6 col-md-8">
	                <h1>
	                    {first_name} {last_name}
	                </h1>
	                <small style={{margin:"0px 0px 0px 5px"}}>
	                	{email}
	                </small>
	            </div>
			</div>
		);
	}
}
export default User;
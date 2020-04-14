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
			    <div class="row">
			        <div class="col-xs-12 col-sm-6 col-md-6">
			            <div class="well well-sm">
			                <div class="row">
			                    <div class="col-sm-6 col-md-4">
			                        <center>
			                        <img src={image} style={img_style}alt="" class="img-rounded img-responsive"/>
			                        </center><br/>
			                    </div>
			                    <div class="col-sm-6 col-md-8">
			                        <h1>
			                            {first_name} {last_name}
			                        </h1>
			                        <small style={{margin:"0px 0px 0px 5px"}}>
			                        	{email}
			                        </small>
			                    </div>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
		);
	}
}
export default User;
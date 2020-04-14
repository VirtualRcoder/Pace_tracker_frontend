import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';

export default class edit  extends Component{

//Constructor
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
//    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.state = {
//      first_name: null,
//      last_name: null,
      image: [],
    }
  }
//Handle the Default Input behaviour
/*  handleInputChange(event){
    event.preventDefault()
    let key= event.target.name
    let value= event.target.value
    this.setState({
      [key]: value
    })
  }*/
//Handle the Default Output behaviour
  handleSubmit(event){
    event.preventDefault()
    let data= this.state 
    console.log(data)
    this.Login(data)
  }

  handleImageChange(event){
    event.preventDefault();
    let key= event.target.name
    let value= event.target.files[0]
    console.log(value)
      this.setState({
      [key]: value
    })
    
    }

//Login Taking Place  
  Login(data){
    const endpoint1 = 'http://127.0.0.1:8000/api/me/upload_image'
    const csrfToken = cookie.load('csrftoken')
    let com = this
    if(csrfToken !== undefined){
          let token = window.localStorage.getItem('token')
          let lookupOptions = {
          method: "POST",
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrfToken,
            "Authorization":`Token ${token}`,
            'type':"formData"
          },
          body:data
      };
      fetch(endpoint1, lookupOptions)
      .then(function(response){
        return response.json()
      })
      .then(function(responseData){
          console.log(responseData)
      })
    }
  }

  render(){
       return(
         <div className="container">
         <br/>
           <div>
             <img style={{margin:"10px 10px 10px 10px"}}/>
           </div>
           <br/>
           <center>
           <form onSubmit={this.handleSubmit}>
              <div><input  id="image" type="file" name="image" accept="image/png, image/jpeg"  onChange={this.handleImageChange} required="true"/>
                <br/>          
              </div><br/><br/>
          <button>Sign Up</button>
        </form>
            </center>
        </div>    
        )  

  }
}
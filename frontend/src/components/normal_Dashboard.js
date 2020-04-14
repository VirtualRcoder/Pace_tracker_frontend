import React, {Component} from 'react';
import i1 from "../i1.jpeg";
import Button from 'react-bootstrap/Button';

export default class Dashboard extends Component{
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this)
  }

  logout(){
    window.localStorage.clear()
    this.props.history.push("/lo");
  }


	render(){
		const grid={
			display: "grid",
	  	gridTemplateColumns:"auto auto auto",
 			backgroundColor: "#2196F3",
 			padding: "10px",
		};
    const ifram = {
      width:"600px",
      height:"650px",
      border:"0px",
      margin:"0px 0px 0px 10px",
    };
    const ifram1 = {
      width:"440px",
      height:"650px",
      border:"0px",
      margin:"0px 0px 0px 10px",
    };
    const logo={
      background:"#00ff00",
      height:"60px"
    };

    const button={
      float:'right',
      margin:'10px 10px 0px 0px',
    };

    return(
      <div className="container">
         <div style={ logo }>
           <img style={{margin:"10px 10px 10px 10px"}} src={i1}/>
           <Button variant="warning"style={button} onClick={this.logout}>Logout</Button>
        </div><br/>
        <div style={grid}>
          <iframe src="/ut" style={ifram}></iframe>
          <iframe src="/u" style={ifram1}></iframe>
        </div>
      </div>
      );
  }
}      

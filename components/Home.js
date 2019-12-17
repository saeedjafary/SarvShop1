import React, { Component } from 'react';
import { StyleSheet,View, Text  } from 'react-native'; 
import { connect } from "react-redux"
import Server from './Server.js'

class Home extends React.Component {   
  constructor(props){   
    super(props);    
      
        this.Server = new Server();
    this.state = {
      username:'9656',
      password:'1',
      result:'ssssssss'
    }

  }  
  componentDidMount() {
 let that = this;
   
    let SCallBack = function(response){
      //alert(2)
      that.setState({
        result:'OK1'  
      })
     console.warn(response)   
    } 
    let ECallBack = function(error){
     alert(error)   
    }  
        
   this.Server.send("https://marketapi.sarvapps.ir/MainApi/getuser",{'username':'123','password':'123'},SCallBack,ECallBack) 
  
  }
  
 
  componentWillUnmount() {
 
 
  }
 
  render() { 

           
    return (   
                
    <View>

      <Text style={{marginTop:100}}>{this.state.result}</Text>
    </View>
           
    );
  }
}


function mapStateToProps(state) {        
  return {
    username : state.username
  }
}
export default connect(mapStateToProps)(Home)  


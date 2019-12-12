import React, { Component } from 'react';
import { StyleSheet,View, Text  } from 'react-native'; 
import { connect } from "react-redux"

class Home extends React.Component {   
  constructor(props){   
    super(props);    
    

    
   

  }  
  componentDidMount() {
 
  
  }
  
 
  componentWillUnmount() {
 
 
  }
 
  render() {

           
    return (   
                
    <View>
    <Text>Home Screan</Text>
    </View>
           
    );
  }
}

const styles = StyleSheet.create({
  
  label:{
    fontFamily:'IRANSansMobile',
    fontSize:12     

      
  }
});
function mapStateToProps(state) {        
  return {
    username : state.username
  }
}
export default connect(mapStateToProps)(Home)  


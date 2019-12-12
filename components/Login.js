import React, { Component } from 'react';
import { StyleSheet,Button } from 'react-native'; 

class Login extends React.Component {   
  constructor(props){   
    super(props);    
    

    
   

  }  
  componentDidMount() {
 
  
  }
  
 
  componentWillUnmount() {
 
 
  }
 
  render() {
    
           
    return (   
                
    <Button
      title="Go to Jane's profile"
      onPress={() => navigate('Home', {name: 'Jane'})}
    />
           
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
export default connect(mapStateToProps)(Login)  


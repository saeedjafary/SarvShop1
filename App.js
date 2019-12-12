import React, { Component } from 'react';
import Login from './components/Login'
import Home from './components/Home'
import { Provider } from "react-redux"
import { createStore } from "redux"
import reducer from './components/reducer.js'
import { connect } from "react-redux"
import {createStackNavigator} from 'react-navigation-stack';
                
       
import {                          
  createAppContainer
} from 'react-navigation';            
const AppStackNavigator = createStackNavigator({
  Login: {                                                   
    screen: Login ,                            
    mode: 'screen',       
    headerMode: 'none',
        navigationOptions: {                    
        header:null,           
        headerVisible: false,
    }
  },
  Home: {                                
    screen: Home,
    mode: 'screen',
    headerMode: 'none',
    navigationOptions: {
        header:null,
        headerVisible: false,
    }      
  
  }
 

 }
 
 );
const Navigator = createAppContainer(AppStackNavigator);
const store = createStore(reducer)

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {           
      loading: true

    }
  }    
  componentDidMount () {
   
  }     
  async componentWillMount() { 
  
  }
  render() {
    return (    
      <Provider store={store}>
          <Navigator color={1}/>
        </Provider>  
      ); 
  } 
}


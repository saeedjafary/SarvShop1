import React, { Component } from 'react';
import { StyleSheet ,ScrollView,ListView,SafeAreaView,FlatList,TouchableOpacity } from 'react-native'; 
import { connect } from "react-redux"
import Server from './Server.js'
import { Image } from 'react-native';
import moment from 'moment-jalaali'; 
import { Container,Content, Header, View,Button, DeckSwiper, Card, CardItem, Thumbnail, Text, Left,Right, Body, Icon,Title,Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {AsyncStorage} from 'react-native';
import HeaderBox from './HeaderBox.js'
class Cat extends React.Component {   
  constructor(props){   
    super(props);    
    this.Server = new Server();
    this.state = {
            


    }

    
   

  }  
  componentDidMount() {
     
   
    
  }
  
 
  componentWillUnmount() {
 
 
  }
  render() {
        
                            
    return (   
    <Container>
        <Content>
        <ScrollView>
             <View>
               <Text>Test</Text>
             </View>
         </ScrollView> 
         </Content> 
     </Container>             
    
           
    );
  }
}


function mapStateToProps(state) {        
  return {
    CartNumber : state.CartNumber
  }
}
export default connect(mapStateToProps)(Cat)  


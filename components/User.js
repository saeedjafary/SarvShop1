import React, { Component } from 'react';
import { StyleSheet ,ScrollView,ListView,SafeAreaView,FlatList } from 'react-native'; 
import { connect } from "react-redux"
import Server from './Server.js'
import { Image } from 'react-native';
import moment from 'moment-jalaali'; 
import { Container,Content, Header,Form,Item, View,Button, DeckSwiper, Card, CardItem, Thumbnail, Text, Left,Right, Body, Icon,Label,Input,Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {AsyncStorage} from 'react-native';

class User extends React.Component {   
  constructor(props){   
    super(props);    
    this.state = {
      username:null
    }
    this.Server = new Server();

    
   

  }  
  componentDidMount() {
 
  
  }
  
 
  componentWillUnmount() {
 
 
  }
 
 
  render() {
   const {navigate} = this.props.navigation;
                
    return (   
    <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body> 
          </Body>
          <Right>
           
          </Right>
        </Header>
        
        <Content>
        <ScrollView>
          <Text style={{textAlign:'center',marginTop:10}}>ورود به محیط کاربری</Text>
         

         </ScrollView> 
         </Content> 
     </Container>   
           
    );
  }
}


function mapStateToProps(state) {        
  return{
    CartNumber : state.CartNumber,
  }
}
export default connect(mapStateToProps)(User)  


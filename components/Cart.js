import React, { Component } from 'react';
import { StyleSheet ,ScrollView,ListView,SafeAreaView,FlatList,TouchableOpacity } from 'react-native'; 
import { connect } from "react-redux"
import Server from './Server.js'
import { Image } from 'react-native';
import moment from 'moment-jalaali'; 
import { Container,Content, Header, View,Button, DeckSwiper, Card, CardItem, Thumbnail, Text, Left,Right, Body, Icon,Title,Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {AsyncStorage} from 'react-native';

class Cart extends React.Component {   
  constructor(props){   
    super(props);    
    this.Server = new Server();
    this.state = {
            Products:[],
            id:this.props.navigation.state.params.id,
            img1:null,
            img2:null,
            img3:null,
            img4:null,
            img5:null,
            originalImage:null,
            Count:"1",
            price:null,
            off:null,
            api_token:null

    }

    
   

  }  
  componentDidMount() {
   // alert(this.props.navigation.state.params.id)
   
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
            <Title>سبد خرید</Title>
          </Body>
          <Right>
           
          </Right>
        </Header>
        
        <Content>
        <ScrollView>
        
         </ScrollView> 
         </Content> 
     </Container>             
    
           
    );
  }
}


function mapStateToProps(state) {        
  return {
    username : state.username
  }
}
export default connect(mapStateToProps)(Cart)  


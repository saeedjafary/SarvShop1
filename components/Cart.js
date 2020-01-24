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
            UserId:null,
            api_token:null,
            lastPrice:"0",
            GridData:null,
            CartNumber:null


    }

    
   

  }  
  componentDidMount() {
       let that = this;

   AsyncStorage.getItem('api_token').then((value) => {
   this.setState({
    api_token : value
   })
   that.Server.send("https://marketapi.sarvapps.ir/MainApi/checktoken",{
      token:that.state.api_token
    },function(response){
      that.setState({
        UserId : response.data.authData.userId
      })
      that.getCartItems();

    },function(error){
        alert(error)
    })
   })
   
    
  }
  
 
  componentWillUnmount() {
 
 
  }
  getCartItems(){
        let that=this;
        this.setState({
            lastPrice : 0
        })         
        let param={
              UId : this.state.userId
        };
        let SCallBack = function(response){
                let lastPrice=0, 
                    CartNumber=0;
                response.data.result.map((res) =>{
                    lastPrice+=res.number*res.price;
                    CartNumber++;
                })
                alert(lastPrice)
                that.setState({
                    lastPrice:lastPrice,
                    GridData:response.data.result,
                    CartNumber:CartNumber
                })
                
    
         };
         let ECallBack = function(error){
                alert(error)
        }
        this.Server.send("https://marketapi.sarvapps.ir/MainApi/getCartPerId",param,SCallBack,ECallBack)
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


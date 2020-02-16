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
        id:this.props.navigation.state.params.id,
        GridData:[]
    }

    
   

  }  
  componentDidMount() {
     
   let that = this;
   
    let SCallBack = function(response){
      that.setState({
        GridData:response.data.result
      })

    }
    let ECallBack = function(error){  
     alert(error)   
    }  
        
   this.Server.send("https://marketapi.sarvapps.ir/MainApi/GetProductsPerCat",{
            id : this.state.id,
            token:  AsyncStorage.getItem('api_token').then((value) => {
                return value

            })
        },SCallBack,ECallBack)
    
  }
  
 
  componentWillUnmount() {
 
 
  }
  render() {
        
                            
    return (   
    <Container>
        <Content>
        <ScrollView>
  {   
           this.state.GridData.map((item, index) => (
  
                <Grid>
                  <Row>
                  <Col>
 <Col>
                       <Image source={{uri:'https://marketapi.sarvapps.ir/' + item.fileUploaded.split("public")[1]}} style={{height: 200, width: null, flex: 1}}/>

                  </Col>
                  </Col>
                  <Col>
                    <Text> {item.price - (item.price * item.off)/100} تومان </Text>
                  </Col>

                  </Row>
                  <Row>
                  <Col>
                    <Text> {item.title} </Text>
                  </Col>
                  <Col>
                    <Text> {item.subTitle} </Text>
                  </Col>
                  </Row>
                  <Row>
                  <Col>
                    <Text> {item.desc} </Text>
                  </Col>
                  
                  </Row>

                </Grid>
             ))     
  }

          
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


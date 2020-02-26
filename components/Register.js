import React, { Component } from 'react';
import { StyleSheet ,ScrollView,ListView,SafeAreaView,FlatList,TouchableOpacity } from 'react-native'; 
import { connect } from "react-redux"
import Server from './Server.js'
import { Image } from 'react-native';
import moment from 'moment-jalaali'; 
import { Container,Content, Header,Form,Item, View,Button, DeckSwiper, Card, CardItem, Thumbnail, Text, Left,Right, Body, Label,Input,Title,Icon } from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';
import {AsyncStorage} from 'react-native';
import HeaderBox from './HeaderBox.js'
class Register extends React.Component {   
  constructor(props){   
    super(props);    
    this.Server = new Server();
    this.state = {
        username:null,
        password:null,
        password2:null,
        name:null,
        SecurityCode : '',
        AfterFirstStep : false,
        AfterFinalStep : false,
        SmsToken : null
    }
    this.Register=this.Register.bind(this);

    
   

  }  
  componentDidMount() {   
     
  
    
  }
  
 
  componentWillUnmount() {
 
 
  }
  Register() {
 
    
    if(!this.state.AfterFirstStep){

      if(this.state.Password != this.state.Password2){
        this.setState({
          HasError:"رمز عبور و تکرار آن متفاوت است"
        })
        return;
      }
  let that = this;
    let SCallBack = function(response){
          if(response.data.result[0] && response.data.result[0].status=="1"){
          this.setState({
            HasError:"شماره موبایل وارد شده قبلا در سیستم ثبت شده است"
          })
          return;
        }
        this.setState({
          AfterFirstStep : true
        })  
            var SecCode = response.data.SecurityCode;
           
                  
            this.Server.send("https://RestfulSms.com/api/Token",{
              "UserApiKey":"3a1e943a66fde9ad4c0aa079",
              "SecretKey":"sj@9074286"
            },function(response){
                    this.setState({
                    SmsToken:response.data.TokenKey
                  })
            this.Server.send("https://marketapi.sarvapps.ir/MainApi/sendsms",{
                    token: response.data.TokenKey,
                    text: "کد امنیتی ثبت نام در فروشگاه اینترنتی سرو : \n"+SecCode,
                    mobileNo : this.state.Mobile
                  },function(response){
                    alert(response)



                  },function(error){
                      alert(error)   
            })

            },function(error){
                      alert(error)   
            })

                 
          }
          let ECallBack = function(error){
              alert(error)   
          }  
        
   this.Server.send("https://marketapi.sarvapps.ir/MainApi/Register",{
        username: this.state.Mobile,
        password: this.state.Password,
        Step: "1"
      },SCallBack,ECallBack)
     
    }
if(this.state.AfterFirstStep){
      if(this.state.SecurityCode == "" ){

        this.setState({
          HasError:"کد امنیتی پیامک شده را وارد کنید"
        })
        return;

      }
let SCallBack = function(response){
              if(response.data.msg){
              this.setState({
                HasError:response.data.msg
              })
              return;
            }

          this.Server.send("https://RestfulSms.com/api/Token",{
            username: this.state.Mobile,
            password: this.state.Password,
            Step: "3"
          },function(response){
            localStorage.setItem("api_token",response.data.token);

            this.setState({
              AfterFinalStep : true
            })    

            },function(error){
                      alert(error)   
            })
            
       }  

      let ECallBack = function(error){
              alert(error)   
          }  
        
   this.Server.send("https://marketapi.sarvapps.ir/MainApi/Register",{
        username: this.state.Mobile,
        password: this.state.Password,
        SecurityCode: this.state.SecurityCode,
        Step: "2"
      },SCallBack,ECallBack)
      
     

    }





 
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
  <View>

   <Text style={{textAlign:'center',marginTop:10}}>ورود به محیط کاربری</Text>
          <Form>
           
            <Item inlineLabel>
              <Input value={this.state.username} keyboardType="number-pad" name="username"                        onChangeText={(text) => this.setState({username:text})  }  />
              <Label>موبایل</Label>

            </Item>
            <Item inlineLabel >
               <Input value={this.state.password} secureTextEntry={true} keyboardType="number-pad" name="password"   onChangeText={(text) => this.setState({password:text})  }  />
               <Label>رمز عبور</Label>
            </Item>
            <Item inlineLabel >
               <Input value={this.state.password} secureTextEntry={true} keyboardType="number-pad" name="password2"   onChangeText={(text) => this.setState({password2:text})  }  />
               <Label>تکرار رمز عبور</Label>
            </Item>   
              <Button iconLeft info style={{marginTop:20}} onPress ={this.Register}>
            <Icon name='arrow-back' />
            <Text>ثبت نام</Text>
          </Button>
         
          </Form>   

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
export default connect(mapStateToProps)(Register)  


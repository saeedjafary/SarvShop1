import React, { Component } from 'react';
import { StyleSheet ,ScrollView,ListView,SafeAreaView,FlatList } from 'react-native'; 
import { connect } from "react-redux"
import Server from './Server.js'
import { Image } from 'react-native';
import moment from 'moment-jalaali'; 
import { Container,Content, Header, View,Button, DeckSwiper, Card, CardItem, Thumbnail, Text, Left,Right, Body, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {AsyncStorage} from 'react-native';
import { Drawer } from 'native-base';
import SideBar from './SideBar.js'

     
let cards = [];      
function Item({ title }) {
  return (
    <View style={{margin:5}}>
      <Button ><Text>{title}</Text></Button>
    </View>
  );
}
class HeaderBox extends React.Component {   
  constructor(props){   
    super(props);    
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.Server = new Server();
    this.state = {
            MaxObj:[],
            HsrajDate:moment(),
            GotoLogin:false,
            GotoCart:false,
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            day:0,
            hours:0,
            minutes:0,
            seconds:0,
            Products:[],
            Products4:[],
            username:null,
            userId:null,
            name:"",
            CartNumber:0
    }
    this.findUser = this.findUser.bind(this);
    
  }  

  findUser(){
    let that = this;
      AsyncStorage.getItem('CartNumber').then((value) => {
                        console.log(value) 

              that.setState({   
                CartNumber:value      
              })
           })
    AsyncStorage.getItem('api_token').then((value) => {    
       let SCallBack = function(response){

         

           that.setState({
             username:response.data.authData.username,
             userId : response.data.authData.userId,
				     name : response.data.authData.name
           })                 
    } 
    let ECallBack = function(error){
     //alert(error)   
    }  
        
   this.Server.send("https://marketapi.sarvapps.ir/MainApi/checktoken",           {token:value},SCallBack,ECallBack) 

    } )
  }
  componentDidUpdate(){
    if(this.props.navigation && this.props.navigation.state  && this.props.navigation.state.params && this.props.navigation.state.params.p && !this.state.username)
      this.findUser(); 
  }
  componentDidMount() {
    this.findUser(); 
  }
 
 

 
  render() { 
    const {navigate} = this.props.navigation;    

           
    return (  
     
    
          
          
        <Grid style={{backgroundColor:'#ccc',marginBottom:5,width:'100%'}}>
        <Row>
      <Col>
         {this.state.username &&
         <View><Text style={{paddingRight:10,textAlign:'right'}}>{this.state.name  ?       this.state.name : this.state.username}</Text></View>
         }
         </Col> 
         
        <Col  style={{width:80}}  onPress={() => { navigate('Cart')}} >
         {this.state.username &&
         <View><Text style={{paddingRight:10,textAlign:'right',verticalAlign:'top'}}> ({this.state.CartNumber}) <Icon type="Ionicons" name="cart" style={{fontSize: 30, color: 'red'}}/></Text></View>
         }
         </Col>  
    
          </Row>
           
          </Grid>
          
    );  
  }
}


function mapStateToProps(state) {        
  return {
    CartNumber : state.CartNumber
  }
}
export default connect(mapStateToProps)(HeaderBox)  


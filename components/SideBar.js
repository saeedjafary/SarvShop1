import React, { Component } from 'react';
import { StyleSheet,Image,View,TouchableOpacity } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Separator,Right,Left,Icon,Button } from 'native-base';
import { connect } from "react-redux"      
import { ScrollView,ListView,SafeAreaView,FlatList } from 'react-native'; 
import Server from './Server.js'

class SideBar extends React.Component { 
  constructor(props){
    super(props);
    this.Server = new Server();

    var date = new Date();
    var offsetInHours = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();   
    this.state={      
       Cat:[]
      
    }
    this.getCategory()
     

  }
 
getCategory(){
 let that = this;
   
    let SCallBack = function(response){
        that.setState({
          Cat:response.data.result
        })
        } 
    let ECallBack = function(error){
     alert(error)   
    } 
  this.Server.send("https://marketapi.sarvapps.ir/MainApi/GetCategory",{},SCallBack,ECallBack) 
 }
  render() {
      const {navigate} = this.props.navigation;    

    return (
      <Container>
          <SafeAreaView >
      <FlatList
        data={this.state.Cat}
        horizontal={false}
        inverted={true}
        renderItem={({ item }) => (
          <View>
          <TouchableOpacity onPress={() => navigate('Login', {name: 'Jane'})} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between','textAlign':'right'}}><Text>{item.name}</Text><Icon name='close'   /></TouchableOpacity>
            
          </View>
        
    )}
        keyExtractor={item => item._id}
      />  
    </SafeAreaView>
      </Container>   
    );      

  }
}
function mapStateToProps(state) {
  return {
    username : state.username,
    password : state.password,
    ip : state.ip,
    account:state.account,
    place:state.place,
    fullname : state.fullname,
    Address : state.Address,    
    placeName : state.placeName,
    Theme : state.Theme
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default connect(mapStateToProps)(SideBar)  

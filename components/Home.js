import React, { Component } from 'react';
import { StyleSheet  } from 'react-native'; 
import { connect } from "react-redux"
import Server from './Server.js'
import { Image } from 'react-native';

import { Container, Header, View,Button, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: require('../img/5725d86ad3aab.jpg'),
  }
];
class Home extends React.Component {   
  constructor(props){   
    super(props);    
      
        this.Server = new Server();
    this.state = {
      username:'9656',
      password:'1',
      result:'ssssssss'
    }

  }  
  componentDidMount() {
 let that = this;
   
    let SCallBack = function(response){
      //alert(2)
      that.setState({
        result:'OK1'  
      })
     console.warn(response)   
    } 
    let ECallBack = function(error){
     alert(error)   
    }  
        
  /* this.Server.send("https://marketapi.sarvapps.ir/MainApi/getuser",{'username':'123','password':'123'},SCallBack,ECallBack) 
  */
  }
  
 
  componentWillUnmount() {
 
 
  }
 
  render() { 

           
    return (   
    <Container>
        <Header />
        <View>
          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={cards}
            renderEmpty={() =>
              <View style={{ alignSelf: "center" }}>
                <Text>Over</Text>
              </View>
            }
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                      <Text>{item.text}</Text>
                      <Text note>NativeBase</Text>  
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={item.image} />
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
            }
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
          <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
            <Icon name="arrow-back" />
            <Text>Swipe Left</Text>
          </Button>
          <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
            <Icon name="arrow-forward" />
            <Text>Swipe Right</Text>
          </Button>
        </View>
      </Container>
           
    );
  }
}


function mapStateToProps(state) {        
  return {
    username : state.username
  }
}
export default connect(mapStateToProps)(Home)  


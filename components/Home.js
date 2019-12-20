import React, { Component } from 'react';
import { StyleSheet ,ScrollView } from 'react-native'; 
import { connect } from "react-redux"
import Server from './Server.js'
import { Image } from 'react-native';
import moment from 'moment-jalaali';
import 'moment/locale/fa'  


import { Container,Content, Header, View,Button, DeckSwiper, Card, CardItem, Thumbnail, Text, Left,Right, Body, Icon } from 'native-base';
const cards = [
  {
    text: 'Card One',
    name: 'One', 
    image: require('../img/5725d86ad3aab.jpg'),
  },
  {
    text: 'Card Two',
    name: 'Two',
    image: require('../img/featured_5.png'),
  },
  {
    text: 'Card Three',
    name: 'Three',
    image: require('../img/banner_product.png'), 
  }   
];
class Home extends React.Component {   
  constructor(props){   
    super(props);    
      
        this.Server = new Server();
    this.state = {
            MaxObj:[],
            HsrajDate:moment(),
            GotoLogin:false,
            GotoCart:false,
            day:0,
            hours:0,
            minutes:0,
            seconds:0,
    }

  }  
  componentDidMount() { 
 let that = this;
   
    let SCallBack = function(response){

     var HarajDate = response.data.result[0].HarajDate.split("/"),
                    TodayDate = response.data.TodayDate.split("/");

    
                if(parseInt(HarajDate[0])>parseInt(TodayDate[0]) || (parseInt(HarajDate[0])==parseInt(TodayDate[0]) && parseInt(HarajDate[1])>parseInt(TodayDate[1]))|| (parseInt(HarajDate[0])==parseInt(TodayDate[0]) && parseInt(HarajDate[1])==parseInt(TodayDate[1]) && parseInt(HarajDate[2])>parseInt(TodayDate[2])))    
                //if(HarajDate >= TodayDate)
                {  
                  // var x = setInterval(function() {
                         var distance = new Date(response.data.result[0].HarajDate) - new Date(new moment().locale('fa').format("jYYYY/jMM/jDD HH:mm:ss"));  
          console.log(new Date(new moment().locale('fa').format("jYYYY/jMM/jDD HH:mm:ss")))    
                        var day = Math.floor(distance / (1000 * 60 * 60 * 24));
                        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds = Math.floor((distance % (1000 * 60)) / 1000); 
                      
                        // Display the result in the element with id="demo"
                        //console.log(response.data.result[0].HarajDate)
                        
                        that.setState({  
                            day:day,   
                            hours:hours,
                            minutes:minutes,
                            seconds:seconds
                        })
                      
                        // If the count down is finished, write some text
                        //if (distance < 0) {
                         // clearInterval(x);
                          //document.getElementById("demo").innerHTML = "EXPIRED";
                        //}
                    //  }, 1000); 
                 var maximg = 'https://marketapi.sarvapps.ir/' + response.data.result[0].fileUploaded.split("public")[1];
                    that.setState({
                        MaxObj:response.data.result[0],
                        maximg:maximg
                    })  
                }  
    } 
    let ECallBack = function(error){
     alert(error)   
    }  
        
   this.Server.send("https://marketapi.sarvapps.ir/MainApi/getProducts",{type:1,limit:0},SCallBack,ECallBack) 
     
  }
  
 
  componentWillUnmount() {
 
 
  }
 
  render() { 

           
    return (   
      <ScrollView>
    <Container>
        <Header />
        <Content>
        
        <View>
        <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri:this.state.maximg}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri:this.state.maximg}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>{this.state.day}</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>{this.state.hours}</Text>
                </Button>
              </Body>
              <Right>
                <Text>{this.state.minutes}</Text>
              </Right>
            </CardItem>
          </Card>
          </View>
        <View style={{marginBottom:100}}>
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
      
       
          </Content> 
      </Container>
           </ScrollView>
    );  
  }
}


function mapStateToProps(state) {        
  return {
    username : state.username
  }
}
export default connect(mapStateToProps)(Home)  


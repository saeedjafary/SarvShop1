import React, { Component } from 'react';
import { StyleSheet ,ScrollView,ListView,SafeAreaView,FlatList } from 'react-native'; 
import { connect } from "react-redux"
import Server from './Server.js'
import { Image } from 'react-native';
import moment from 'moment-jalaali'; 
import { Container,Content, Header, View,Button, DeckSwiper, Card, CardItem, Thumbnail, Text, Left,Right, Body, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
    
let cards = [];
function Item({ title }) {
  return (
    <View style={{margin:5}}>
      <Button ><Text>{title}</Text></Button>
    </View>
  );
}
class Home extends React.Component {   
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
            Cat:[],
            Products:[],
            Products4:[]
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
                   var x = setInterval(function() {
                         var distance = new Date(response.data.result[0].HarajDate) - new Date(new moment().format("jYYYY/jMM/jDD HH:mm:ss"));  
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
                        if (distance < 0) {
                          clearInterval(x);
                          //document.getElementById("demo").innerHTML = "EXPIRED";
                        }
                      }, 1000); 
                 var maximg = 'https://marketapi.sarvapps.ir/' + response.data.result[0].fileUploaded.split("public")[1];
                    that.setState({
                        MaxObj:response.data.result[0],
                        maximg:maximg
                    })   
                }  
                that.getCategory()
    } 
    let ECallBack = function(error){
     alert(error)   
    }  
        
   this.Server.send("https://marketapi.sarvapps.ir/MainApi/getProducts",{type:1,limit:0},SCallBack,ECallBack) 
     
  }
  
 
  componentWillUnmount() {
 
 
  }
 getProducts(limit){
let that = this;
   
    let SCallBack = function(response){
        if(limit==6)
        {
          that.setState({
            Products:response.data.result
          })
          that.getProducts(4);
        }
        if(limit==4){
          that.setState({
            Products4:response.data.result
          })
        }
        } 
    let ECallBack = function(error){
     alert(error)   
    } 
  this.Server.send("https://marketapi.sarvapps.ir/MainApi/getProducts",{type:1,limit:limit},SCallBack,ECallBack) 


 } 
 getCategory(){
 let that = this;
   
    let SCallBack = function(response){
        that.setState({
          Cat:response.data.result
        })
        that.getProducts(6)
        } 
    let ECallBack = function(error){
     alert(error)   
    } 
  this.Server.send("https://marketapi.sarvapps.ir/MainApi/GetCategory",{},SCallBack,ECallBack) 
 }
  render() { 

           
    return (   
    <Container>
        <Header />
        
        <Content>
        <ScrollView>
      
           
          <Grid>
          
             <Row>
                <Col>
               <SafeAreaView >
      <FlatList
        data={this.state.Cat}
        horizontal={true}
        inverted={true}
        renderItem={({ item }) => <Item title={item.name} />}
        keyExtractor={item => item._id}
      />  
    </SafeAreaView>
                </Col>
             </Row>
             
              <Row >
                <Col style={{height: 300 }}>
        <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri:'https://www.pizzagooshe.com/Content/UploadFiles/contents/LG_7f48205b-a12c-4dde-a99b-f7a5b5eb022e.png'}} />
                <Body>
                  <Text>{this.state.MaxObj.title}</Text>
                  <Text note>{this.state.MaxObj.subTitle}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri:this.state.maximg}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              
 <Body style={{position:'absolute',bottom:50,right:0,backgroundColor:'rgba(0,0,0,0.5)',direction:'rtl',padding:5}}>
               <Text style={{color:'#fff'}}>حراج روز</Text>
                <Text style={{color:'yellow'}}> {this.state.day} روز {this.state.hours} ساعت  {this.state.minutes} دقیقه {this.state.seconds} ثانیه </Text>
                
              </Body>    
            </CardItem>
          </Card>
          </Col>
             </Row></Grid>
               <Grid>
           {this.state.Products4[1] &&
          <Row style={{height:200}}>
            <Col>
              <View>
                <Image style={{ height: '100%',opacity:'0.8'}} source={{uri:'https://marketapi.sarvapps.ir/' + this.state.Products4[0].fileUploaded.split("public")[1]}} />
               <View style={{position:'absolute',bottom:50,right:0,backgroundColor:'rgba(0,0,0,0.5)',padding:5,width:'100%'}}>  
               <Text style={{textAlign:'right',color:'#fff'}} >
              {this.state.Products4[0].title}
                </Text>
                <Text style={{textAlign:'right',color:'#fff'}}>
              {this.state.Products4[0].price - ((this.state.Products4[0].price * this.state.Products4[0].off)/100)} تومان

                </Text>
                </View>
              </View>
            </Col>
            <Col>
              <View>
                <Image style={{ height: '100%',opacity:'0.8'}} source={{uri:'https://marketapi.sarvapps.ir/' + this.state.Products4[1].fileUploaded.split("public")[1]}} />
               <View style={{position:'absolute',bottom:50,right:0,backgroundColor:'rgba(0,0,0,0.5)',padding:5,width:'100%'}}>  
               <Text style={{textAlign:'right',color:'#fff'}} >
              {this.state.Products4[1].title}
                </Text>
                <Text style={{textAlign:'right',color:'#fff'}}>
              {this.state.Products4[1].price - ((this.state.Products4[1].price * this.state.Products4[0].off)/100)} تومان

                </Text>
                </View>
              </View>
            </Col>
          </Row>
           }
           {this.state.Products4[3] &&
          <Row style={{height:200}}>
            <Col>
               <View>
                <Image style={{ height: '100%',opacity:'0.8'}} source={{uri:'https://marketapi.sarvapps.ir/' + this.state.Products4[2].fileUploaded.split("public")[1]}} />
               <View style={{position:'absolute',bottom:50,right:0,backgroundColor:'rgba(0,0,0,0.5)',padding:5,width:'100%'}}>  
               <Text style={{textAlign:'right',color:'#fff'}} >
              {this.state.Products4[2].title}
                </Text>
                <Text style={{textAlign:'right',color:'#fff'}}>
              {this.state.Products4[2].price - ((this.state.Products4[2].price * this.state.Products4[0].off)/100)} تومان

                </Text>
                </View>
              </View>
            </Col>
            <Col>
               <View>
                <Image style={{ height: '100%',opacity:'0.8'}} source={{uri:'https://marketapi.sarvapps.ir/' + this.state.Products4[3].fileUploaded.split("public")[1]}} />
               <View style={{position:'absolute',bottom:50,right:0,backgroundColor:'rgba(0,0,0,0.5)',padding:5,width:'100%'}}>  
               <Text style={{textAlign:'right',color:'#fff'}} >
              {this.state.Products4[3].title}
                </Text>
                <Text style={{textAlign:'right',color:'#fff'}}>
              {this.state.Products4[3].price - ((this.state.Products4[3].price * this.state.Products4[0].off)/100)} تومان

                </Text>
                </View>
              </View>
            </Col>
          </Row>
          }
        </Grid>
             <Grid>
             {this.state.Products.length>0 &&
             <Row>  
             <Col style={{  height: 300 }}>  
          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={this.state.Products}
            renderEmpty={() =>
              <View style={{ alignSelf: "center" }}>
                <Text>Over</Text>
              </View>  
            }  
            renderItem={item =>
            
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left> 
                    <Thumbnail source={{uri:'https://marketapi.sarvapps.ir/' + item.fileUploaded.split("public")[1]}} />
                    <Body>    
                      <Text>{item.title}</Text>
                      <Text note>{item.subTitle}</Text>  
                    </Body>
                  </Left> 
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={{uri:'https://marketapi.sarvapps.ir/' + item.fileUploaded.split("public")[1]}} />
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.title}</Text>
                </CardItem>
              </Card>
            }
          />  
        </Col></Row>
        }
        </Grid>
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
export default connect(mapStateToProps)(Home)  


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
            CartNumber:null,
            ItemCount:[]


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
  ChangeCount(C,I,product_id){
      if(C==-1 && this.state.ItemCount[I] <= 1  )
          return;
      let ItemCount = this.state.ItemCount;
      ItemCount[I] = parseInt(ItemCount[I])+C+"";
      /*this.setState({
        ItemCount : ItemCount
      })*/
      let that = this;
      let param={  
              product_id :  product_id,
              user_id : this.state.UserId,
              number:C=="0" ? C : ItemCount[I]
        };

        let SCallBack = function(response){
                that.getCartItems();
         };
         let ECallBack = function(error){
                alert(error)
        }
        this.Server.send("https://marketapi.sarvapps.ir/MainApi/changeCart",param,SCallBack,ECallBack)

  }
  getCartItems(){
        let that=this;
        this.setState({
            lastPrice : 0
        })         
        let param={
              UId : this.state.UserId
        };

        let SCallBack = function(response){
                let lastPrice=0, 
                    CartNumber=0,
                    ItemCount=[];
                response.data.result.map((res,index) =>{
                    lastPrice+=res.number*res.price;
                    CartNumber+=parseInt(res.number);
                    ItemCount[index] = res.number+""

                })
                AsyncStorage.setItem('CartNumber',CartNumber);
                                     console.log(CartNumber)

                that.setState({
                    lastPrice:lastPrice,
                    GridData:response.data.result,
                    CartNumber:CartNumber,
                    ItemCount:ItemCount
                })
                 that.props.dispatch({
                    type: 'LoginTrueUser',    
                    CartNumber:that.state.CartNumber
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
            <Title style={{fontFamily:"IRANSansMobile"}}>سبد خرید ({this.state.CartNumber})</Title>
          </Body>
          <Right>
           
          </Right>
        </Header>
        
        <Content>
        <ScrollView>
        <View>
        <Text   style={{fontFamily:"IRANSansMobile",textAlign:'center',marginTop:10,marginBottom:10}}>
            مبلغ قابل پرداخت  
            &nbsp;&nbsp;<Text style={{fontSize:25,color:'red'}}>{this.state.lastPrice}</Text> &nbsp;&nbsp; 
            تومان
        </Text>
        <Button style={{textAlign:'center',marginTop:10,marginBottom:10}} ><Text   style={{fontFamily:"IRANSansMobile"}}> پرداخت </Text></Button>
        </View>
         <Grid style={{border:'1px solid red'}}>
{
        this.state.GridData && this.state.GridData.map((item, index) => (
          
          <Row style={{height:200,borderWidth: 1,borderColor: '#d6d7da'}}>
    <Col style={{verticalAlign:'middle',borderRightWidth: 1,borderColor: '#d6d7da',paddingTop:70}}>
    <TouchableOpacity  onPress={() => this.ChangeCount("0",index,item.products[0]._id)}><Icon name='close' style={{fontSize:50,textAlign:'center'}}  /></TouchableOpacity>
      
    </Col>      
   <Col style={{borderRightWidth: 1,borderColor: '#d6d7da'}}>
  <Grid>
    <Row>
      <Col>
          <TouchableOpacity onPress={() => this.ChangeCount(+1,index,item.products[0]._id)} ><Text style={{fontFamily:"IRANSansMobile",fontSize:50,textAlign:'center'}}>+</Text></TouchableOpacity>
      </Col> 
      </Row>
      <Row> 
      <Col>
          <View>
            <Text style={{fontFamily:"IRANSansMobile",fontSize:50,textAlign:'center'}}>
              {this.state.ItemCount[index]}
            </Text>
          </View>
      </Col>
      </Row>
      <Row>
      <Col>
          <TouchableOpacity  onPress={() => this.ChangeCount(-1,index,item.products[0]._id)}><Text style={{fontFamily:"IRANSansMobile",fontSize:50,textAlign:'center'}}>-</Text></TouchableOpacity>
      </Col>
    </Row>
  </Grid>
  
  </Col>       
  <Col style={{width:'60%',borderRightWidth: 1,borderColor: '#d6d7da'}}>
      <View>
        <Text style={{fontFamily:"IRANSansMobile",textAlign:"center"}}>
          {item.products[0].desc}
        </Text>
      </View>
  </Col>
  
  <Col>
  <View>
        <Text style={{fontFamily:"IRANSansMobile",textAlign:"center"}}>
          {item.products[0].title}
        </Text>
      </View>
      <View>
        <Text style={{fontFamily:"IRANSansMobile",textAlign:"center"}}>
          {item.products[0].subTitle}
        </Text>
      </View>
      
  </Col>
</Row>
               
         )) 
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
    CartNumber : state.CartNumber
  }
}
export default connect(mapStateToProps)(Cart)  


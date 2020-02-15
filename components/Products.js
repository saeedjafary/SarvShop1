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

class Products extends React.Component {   
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
    this.changeImage = this.changeImage.bind(this)

    
   

  }  
  componentDidMount() {
   // alert(this.props.navigation.state.params.id)
   AsyncStorage.getItem('api_token').then((value) => this.setState({
    api_token : value
   }))
   this.getProduct();
  }
  
 
  componentWillUnmount() {
 
 
  }
  ChangeCount(p){
      if(p==-1 && this.state.Count <= 1  )
        return;
      this.setState({
        Count:parseInt(this.state.Count)+p+""
      })
  }
  changeImage(p){
    let img = null;
    if(p=="1")
      img = this.state.img1;
    if(p=="2")
      img = this.state.img2;
    if(p=="3")
      img = this.state.img3;
    if(p=="4")
      img = this.state.img4;
    if(p=="5")
      img = this.state.img5;
    this.setState({
      originalImage : img
    })
    
  }
  SendToCart(){
    let that = this;
    this.Server.send("https://marketapi.sarvapps.ir/MainApi/checktoken",{
      token:this.state.api_token   
    },function(response){
      let SCallBack = function(response){
             that.props.navigation.navigate('Cart',{p:'a'}) 
    } 
    let ECallBack = function(error){
     alert(error)   
    }  
    let param={
       PId : that.state.id,
       Number : that.state.Count,
       UId :  response.data.authData.userId,
       Price : that.state.Products[0].price - ((that.state.Products[0].price * that.state.Products[0].off)/100),
       Status:"0",
       Type:"insert",
       token: that.state.api_token
   }  
   that.Server.send("https://marketapi.sarvapps.ir/MainApi/ManageCart",param,SCallBack,ECallBack) 

    },function(error){
        alert("ابتدا وارد سایت شوید")
    }) 
        

    }
  getProduct(){
    let that = this;
   
    let SCallBack = function(response){
                    var resp = response.data.result[0];
                    that.setState({
                        Products:response.data.result,
                img1:resp.fileUploaded != "" ? resp.fileUploaded.split("public")[1] : 'nophoto.png',
                img2:resp.fileUploaded1 != "" ? resp.fileUploaded1.split("public")[1] : 'nophoto.png',
                img3:resp.fileUploaded2 != "" ? resp.fileUploaded2.split("public")[1] : 'nophoto.png',
                img4:resp.fileUploaded3 != "" ? resp.fileUploaded3.split("public")[1] : 'nophoto.png',
                img5:resp.fileUploaded4 != "" ? resp.fileUploaded4.split("public")[1] : 'nophoto.png',
                originalImage:resp.fileUploaded != "" ? resp.fileUploaded.split("public")[1] : 'nophoto.png'
                    })  
                 //   alert(that.state.Products.length)  
    } 
    let ECallBack = function(error){
     alert(error)   
    }  
    let param={
        id : this.state.id,
        token: this.state.api_token
        };    
   this.Server.send("https://marketapi.sarvapps.ir/MainApi/getProducts",param,SCallBack,ECallBack) 
  }
  render() {
        const {navigate} = this.props.navigation;
        
                       
    return (   
    <Container>
        <HeaderBox navigation={this.props.navigation} title={'محصولات'} goBack={true} />
        
        <Content>
        <ScrollView>
        {this.state.Products.length>0 &&
          <Grid>
             <Row>  
             <Col >  
                <View style={{backgroundColor:'#eee'}}>
                  <Text style={{fontFamily:'IRANSansMobile',textAlign:'center',paddingRight:10,fontSize:25}}>{this.state.Products[0].title}</Text>
                  <Text style={{fontFamily:'IRANSansMobile',textAlign:'center',paddingRight:10}}>{this.state.Products[0].subTitle}</Text>
                  <Text style={{fontFamily:'IRANSansMobile',textAlign:'right',padding:10,color:'red'}}>{this.state.Products[0].price - ((this.state.Products[0].price * this.state.Products[0].off)/100)} تومان</Text>

               
                </View>
                <View>
                  <Text style={{fontFamily:'IRANSansMobile',textAlign:'right',padding:10}}>{this.state.Products[0].desc}</Text>
                </View>
             </Col>
             
             </Row>
           
        <Row>
        <Col >
<TouchableOpacity onPress={() => this.changeImage(5)} ><Image source={{uri:'https://marketapi.sarvapps.ir/' + this.state.img5 }} style={{border:1,height: 60, width: null, flex: 1}}/></TouchableOpacity>
</Col><Col >
<TouchableOpacity onPress={() => this.changeImage(4)} ><Image  source={{uri:'https://marketapi.sarvapps.ir/' + this.state.img4}} style={{height: 60, width: null, flex: 1}}/></TouchableOpacity></Col><Col >
<TouchableOpacity onPress={() => this.changeImage(3)} ><Image source={{uri:'https://marketapi.sarvapps.ir/' + this.state.img3}} style={{height: 60, width: null, flex: 1}}/></TouchableOpacity></Col><Col >
<TouchableOpacity onPress={() => this.changeImage(2)} ><Image source={{uri:'https://marketapi.sarvapps.ir/' + this.state.img2}} style={{height: 60, width: null, flex: 1}}/></TouchableOpacity></Col><Col >
<TouchableOpacity onPress={() => this.changeImage(1)} ><Image source={{uri:'https://marketapi.sarvapps.ir/' + this.state.img1}} style={{border:1,height: 60, width: null, flex: 1}}/></TouchableOpacity>
        </Col>
        </Row>
          <Row>  
             <Col style={{  height: 300}}>  
             <Image source={{uri:'https://marketapi.sarvapps.ir/' + this.state.originalImage}} style={{ width: null, flex: 1}}/>
        </Col>
        </Row>
        </Grid>
}
  <Grid>
    <Row>
      <Col  style={{width:'20%'}}>
          <TouchableOpacity onPress={() => this.ChangeCount(1)}><Text style={{fontFamily:'IRANSansMobile',fontSize:50,textAlign:'center'}}>+</Text></TouchableOpacity>
      </Col>
      <Col style={{width:'60%'}}>
          <Input value={this.state.Count} keyboardType="number-pad" name="username"                        onChangeText={(text) => this.setState({Count:text})  } style={{border:1,textAlign:'center',fontSize:50}}  />
      </Col>
      <Col style={{width:'20%'}}>
          <TouchableOpacity  onPress={() => this.ChangeCount(-1)}><Text style={{fontFamily:'IRANSansMobile',fontSize:50,textAlign:'center'}}>-</Text></TouchableOpacity>
      </Col>
    </Row>
  </Grid>
  <View style={{fontFamily:'IRANSansMobile',textAlign:'center',marginBottom:10,marginTop:10}}>
      <Button iconLeft light onPress={() => this.SendToCart()}>
            <Icon name='cart' />
            <Text style={{fontFamily:'IRANSansMobile',textAlign:'center'}}>انتقال به سبد خرید</Text>
          </Button>
  </View>
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
export default connect(mapStateToProps)(Products)  


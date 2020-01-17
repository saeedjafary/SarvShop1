import React, { Component } from 'react';
import { StyleSheet ,ScrollView,ListView,SafeAreaView,FlatList } from 'react-native'; 
import { connect } from "react-redux"
import Server from './Server.js'
import { Image } from 'react-native';
import moment from 'moment-jalaali'; 
import { Container,Content, Header, View,Button, DeckSwiper, Card, CardItem, Thumbnail, Text, Left,Right, Body, Icon,Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class Products extends React.Component {   
  constructor(props){   
    super(props);    
    this.Server = new Server();
    this.state = {
            Products:[]
    }

    
   

  }  
  componentDidMount() {
    alert(this.props.navigation.state.params.id)
  
  }
  
 
  componentWillUnmount() {
 
 
  }
  getProduct(){
    let that = this;
   
    let SCallBack = function(response){

                    that.setState({
                        MaxObj:response.data.result[0],
                        maximg:maximg
                    })   
    } 
    let ECallBack = function(error){
     alert(error)   
    }  
        
   this.Server.send("https://marketapi.sarvapps.ir/MainApi/getProducts",{type:1,limit:0},SCallBack,ECallBack) 
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
            <Title>محصولات</Title>
          </Body>
          <Right>
           
          </Right>
        </Header>
        
        <Content>
        <ScrollView>
          <Grid>
             {this.state.Products.length>0 &&
             <Row>  
             <Col style={{  height: 300 }}>  
             <Button
      title="Go to Jane's profile"
      onPress={() => this.props.navigation.goBack()}
    />
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
export default connect(mapStateToProps)(Products)  


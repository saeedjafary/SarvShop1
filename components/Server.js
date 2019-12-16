import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'

export default class Server extends React.Component {
  constructor(props){

    super(props);
    this.state={
      username:null
    }  
   
  }
  
  send(url,params,SuccessCallBack,ErrorCallBack){
    axios.post(url, params)
    .then(function (response) {
      SuccessCallBack(response);
    })
    .catch(function (error) {
      ErrorCallBack(error);
    });
 
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

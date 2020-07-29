import React, { Component,useEffect,createRef } from 'react';
import ChatUI from './ChatUI/ChatUI'
import io from 'socket.io-client';
import { View,Text,AsyncStorage } from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat'
import Login from './Login/Login'

class Main extends Component{

    state={
        registered:true,
        userId:'',
        userName:''
    }
    socket=createRef(null)
    componentDidMount=()=>{
        this.socket['current']=io('https://floating-lake-60154.herokuapp.com')
        // this.setUser();
        // this.removeUser()
        this.fetchUser();  
    }
    removeUser=()=>{
        AsyncStorage.setItem('userId','')
        AsyncStorage.setItem('userName','')
    }
    fetchUser=()=>{
        AsyncStorage.getItem('userId').then(res=>{
            if(res)
                AsyncStorage.getItem('userName').then(res2=>{
                    if(res2){
                        this.setState({userId:res,userName:res2})
                        this.storeSocket();
                        console.log("main2",res,res2)
                    }
                })  
        })
    }
    storeSocket=()=>{
        this.socket.current.emit('storeSocket',{userId:this.state.userId,userName:this.state.userName})
    }
    render(){
        return(  
            this.state.userId.length>0&&this.state.userName.length>0?
                <ChatUI socket={this.socket} userId={this.state.userId} userName={this.state.userName}></ChatUI>:
                <Login socket={this.socket} fetchUser={this.fetchUser}></Login>
            
        );
    }
}
export default Main;

const msg=[
    {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 3,
        text: 'Hello developer2',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
]
  
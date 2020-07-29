import React, { Component,useEffect,createRef } from 'react';
import { StyleSheet, Text, View,TextInput, Button} from 'react-native';
import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat'
// import Speech from 'react-speech';
import * as Speech from 'expo-speech';
class ChatUI extends Component{
    state={
        messages:[],
        userId:'',
        messageId:{}
    }
    onSend=(request=[])=> {
        Speech.stop();
        var messages=this.state.messages;
        messages=[...request,...messages]
        this.setState({messages:messages,textToSpeech:''});
        this.sendToServer(request);
        this.responseFromServer();  
    }
    sendToServer=(request)=>{
        setTimeout(() => {
            this.props.socket.current.emit('sendToServer',request[0].text)
        }, 100);  
    }
    responseFromServer=()=>{
        this.props.socket.current.on("sendToClient",res=>{
            if(!this.state.messageId[res._id]){
                this.textToSpeech(res.text)
                var messages=this.state.messages;
                var messageId=this.state.messageId
                var message=[res]
                messages=[...message,...messages];
                messageId[res._id]=true;
                this.setState({messages:messages,messageId:messageId})
            }
        })
    }
    textToSpeech=(text)=>{
        text=text.split('Link')[0]
        Speech.speak(text)
    }
    quickReply=(props)=>{
        // console.log(props)
        var msg=makeMessage(props[0].messageId,props[0].value)
        setTimeout(() => {
            this.onSend([msg])   
        }, 100);
    }
    render(){
        return(             
            // <Text>snga</Text>  
            // <View>
            <GiftedChat messages={this.state.messages} user={{_id:1}} onSend={this.onSend} onQuickReply={this.quickReply}></GiftedChat>  
            // <View style={styles.container}>
            //     <Button title="Press to hear some words" onPress={this.textToSpeech} />
            // </View>   
            // {/* </View>     */}
            
        );
    }
}

export default ChatUI;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    temp:{
        marginTop:100,
    }
});
const makeMessage=(currentMessageId,message,image='')=>{
    return{
        _id:currentMessageId+(Math.floor(Math.random() * 10000000)),
        text:message,
        createdAt:new Date(),
        user:{
            _id:1,
        },
        image:image,
    }
}
const msg=
[{
  _id: 1,
  text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
  createdAt: new Date(),
  quickReplies: {
    type: 'radio', // or 'checkbox',
    keepIt: true,
    values: [
      {
        title: '😋 Yes',
        value: 'yes',
      },
      {
        title: '📷 Yes, let me show you with a picture!',
        value: 'yes_picture',
      },
      {
        title: '😞 Nope. What?',
        value: 'no',
      },
    ],
  },
  user: {
    _id: 1,
    name: 'React Native',
  },
},]
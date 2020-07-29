import React,{Component,useRef,createRef} from 'react'
import { StyleSheet, Text, View,TextInput,Button } from 'react-native';
import io from 'socket.io-client';

class ChatPage extends Component{

    state={
        messages:[],
        currentMessage:'zx,zhx',
        currentType:'',
        m:['sadgf','msdh','jsadg']
    }

    static getDerivedStateFromProps=(props,state)=> {
        var messages=state.messages;
        messages.push({message:props.newMessage,type:props.type})
        // this.setState({messages:messages,currentMessage:props.newMessage,currentType:props.type})
        return(
            {
                messages:messages,
                currentType:props.type,
                currentMessage:props.newMessage
            }
        )
    }
    render(){

        return(
            <View>
                {/* <Text>asdhg</Text> */}
                {this.state.messages.map(((msg,i)=>(
                    <Text key={i}>{msg.message}</Text>
                )))}
                {/* {this.displayMessage}  */}
            </View>
        )
    }
}
export default ChatPage

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   width:'100%',
      display:'flex'
    },
    textStyle:{
        color:'red'
    }
  });
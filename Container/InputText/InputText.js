import React,{Component,useRef,createRef} from 'react'
import { StyleSheet, Text, View,TextInput,Button } from 'react-native';
import io from 'socket.io-client';


class InputText extends Component{

    state={
        text:'',
        // socket:'',
        socket2:'',
        receivedMessage:''

    }
    socket=createRef(null)
    
    componentDidMount=()=>{
        this.socket['current']=io('http://192.168.43.4:3001')
    }
    changeText=(props)=>{
        // console.log(props.nativeEvent.text)
        var t=props.nativeEvent.text;
        this.setState({text:t})
    }
    sendMessage=()=>{
        this.props.newMessage(this.state.text,'client')
        var check=false;
        this.socket.current.emit('sendToServer',this.state.text)
        this.socket.current.on("sendToClient",message=>{
            if(!check)
                this.props.newMessage(message,'server')
            check=true;
        })
        this.setState({text:''})
        
    }
    render(){
        return(
            <View style={styles.container}>
                {/* <Text>{this.state.receivedMessage}</Text> */}
                <TextInput style={styles.textInput} value={this.state.text} onChange={this.changeText}></TextInput>
                <Button title="send" onPress={this.sendMessage}></Button>
            </View>
        );

    }
}
export default InputText;
const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   width:'100%',
      display:'flex'
    },
    textInput:{
        borderColor:'black',
        borderWidth:1,
        width:'100%'
    }
  });
import React,{Component} from 'react'
import { View,Text,AsyncStorage, TextInput, Button,StyleSheet } from 'react-native';

class Login extends Component{

    state={
        userId:'',
        userName:''
    }
    changeId=(props)=>{
        this.setState({userId:props.nativeEvent.text})
    }
    changeName=(props)=>{
        this.setState({userName:props.nativeEvent.text})
    }
    login=()=>{
        if(this.state.userId.length>0&&this.state.userName.length>0){
            this.props.socket.current.emit('validateUser',{userId:this.state.userId,userName:this.state.userName})
            var check=false;
            this.props.socket.current.on("validatedUser",res=>{
                if(!check){
                    if(res.newUser==true) alert("Seems you'r new here, created fresh UserId")
                    else alert('Welcome Back '+ this.state.userName)
                    this.setUser();
                    this.props.fetchUser();
                }
                check=true;
            })
        }
        else{
            alert('Please Fill All Details')
        }
    }
    setUser=()=>{
        AsyncStorage.setItem('userId',this.state.userId)
        AsyncStorage.setItem('userName',this.state.userName)
    }
    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.textInput} placeholder='enter Your Name' onChange={this.changeId}></TextInput>
                <TextInput style={styles.textInput} placeholder='enter UserName' onChange={this.changeName}></TextInput>
                <Button title='Login' onPress={this.login}></Button>
            </View>
        )
    }
}
export default Login;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput:{
        borderColor:'black',
        marginBottom:5,
        borderWidth:1,
    }
  });
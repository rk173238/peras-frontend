import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import io from 'socket.io-client';
import Main from './Container/Main2'
export default function App() {
  
  // useEffect(function(){
  //       io('http://192.168.43.4:3001')
  // },[])
  return (
    // <View style={styles.container}>
      <Main></Main>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

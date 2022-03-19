import { Keyboard, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from 'react-native-elements';
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import {AntDesign,SimpleLineIcons,FontAwesome,Ionicons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../firebase';
import firebase from "firebase/compat/app";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
          title:"Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{
          flexDirection: "row",
          alignItems:"center",
        }}>
          <Avatar rounded source={{uri: message[0]?.data.photoURL || "https://play-lh.googleusercontent.com/jCln_XT8Ruzp7loH1S6yM-ZzzpLP1kZ3CCdXVEo0tP2w5HNtWQds6lo6aLxLIjiW_X8"}}/>
          <Text style={{ color:"white", marginLeft: 10, fontWeight: "700",fontSize:20}}>{route.params.chatName}</Text>
         </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="white"/>
          </TouchableOpacity>
      ),
      headerRight: () => (
                <View style={{ 
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight:20,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color="white"/>
                    </TouchableOpacity>
                </View>
            ),
        });
  }, [navigation,message]);
  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection('chats').doc(route.params.id).collection('message').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };

  useLayoutEffect(() => {
    const unsub = db.collection('chats').doc(route.params.id).collection('message')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => setMessage(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      ));
    return unsub;
  }, [route]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
            <ScrollView contentContainerStyle={{paddingTop:15}}>
              {message.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar 
                      position="absolute"
                      rounded
                      //web
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right:-5,
                      }}
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                    <View key={id} style={styles.sender}>
                      <Avatar 
                        position="absolute"
                        rounded
                        containerStyle={{
                        position: "absolute",
                        bottom: -5,
                        right:-5,
                      }}
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
              )
              )}
          </ScrollView>
        <View style={styles.footer}>
            <TextInput
              value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
              style={styles.textInput} placeholder='Signal Message' />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={sendMessage}
            >
              <Ionicons name='send' size={24} color='#2B68E6'/>
            </TouchableOpacity>
          </View>
          </>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  ) 
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding:15,
  },
  textInput: {
    bottom: 0,
    height:40,
    flex: 1,
    marginRight:15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius:30,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin:15,
    maxWidth: "80%",
    position:"relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    margin:15,
    maxWidth: "80%",
    position:"relative",
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color:"black",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom:15,
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  }
})
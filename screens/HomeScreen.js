import { StyleSheet,ScrollView, Text,TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from './components/CustomListItem'
import { View } from 'react-native-web'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'

const HomeScreen = ({ navigation }) => {
    const [chat, setChat] = useState([]);
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    };

    useEffect(() => {
        const unsub = db.collection("chats").onSnapshot((snapshot) => (
            setChat(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
        return unsub;
    }, []);

    const enterChat = (id,chatName) => {
        navigation.navigate("Chat", { id, chatName });
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: 'fff' },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                        </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{ 
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 70,
                    marginRight:20,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>navigation.navigate("AddChat")}    activeOpacity={0.5}>
                        <SimpleLineIcons name='pencil' size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);
  return (
      <SafeAreaView>
          <ScrollView style={styles.container}>
              {chat.map(({id,data:{chatName}}) => (
                  <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
              ))}
              <CustomListItem/>
          </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height:"100%",
    }
})

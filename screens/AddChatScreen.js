import { StyleSheet, Text, View } from 'react-native'
import React,{useLayoutEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input } from 'react-native-elements';
import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"add a new chat",
            headerTitle: "Back to login",
        });
    }, [navigation]);
    const createChat =async () => {
        db.collection('chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack();
        })
            .catch((e) = alert(e));
    }
  return (
    <View style={styles.container}>
        <Input placeholder='Enter chat name'
              value={input}
              onSubmitEditing={createChat}
              onChangeText={(text) => setInput(text)}
              leftIcon={
                  <Icon name='wechat' type="antdesign" size={24} color="black"/>
              }
          />
          <Button disabled={!input} onPress={createChat} title="create new Chat"/>
      </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{}
})
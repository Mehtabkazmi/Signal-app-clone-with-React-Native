import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import { db } from '../../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsub = db.collection('chats').doc(id).collection('message')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => setChatMessages(
        snapshot.docs.map((doc) => doc.data())
      ));
    return unsub;
  })
  return (
    <ListItem
    onPress={()=>enterChat(id,chatName)}  key={id} bottomDivider>
        <Avatar
            rounded
            source={{
            uri: chatMessages?.[0]?.photoURL || "https://play-lh.googleusercontent.com/jCln_XT8Ruzp7loH1S6yM-ZzzpLP1kZ3CCdXVEo0tP2w5HNtWQds6lo6aLxLIjiW_X8",
        }}
          />
          <ListItem.Content>
              <ListItem.Title style={{fontWeight:"800"}}>
                {chatName}
              </ListItem.Title>
              <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
              </ListItem.Subtitle>
          </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})
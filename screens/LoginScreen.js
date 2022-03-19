import { StyleSheet, Text, View } from 'react-native';
import { Button,Input,Image } from 'react-native-elements';
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native-web';
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            // console.log(authUser);
            if (authUser) {
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    }, []);
    const signin = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error));
    }
  return (
    <KeyboardAvoidingView behavior="padding"  style={styles.container}>
          <StatusBar style='light' />
          <Image source={{
              uri:"https://play-lh.googleusercontent.com/jCln_XT8Ruzp7loH1S6yM-ZzzpLP1kZ3CCdXVEo0tP2w5HNtWQds6lo6aLxLIjiW_X8",
          }}
              style={{width:200,height:200}}
          />
          <View style={styles.inputContainer}>
              <Input placeholder='email' autoFocus type="email"
                  value={email}
                  onChangeText={(text)=>setEmail(text)}
            />
              <Input placeholder='Password' secureTextEntry type="password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  onSubmitEditing={signin}
            />
          </View>
          <Button containerStyle={styles.button} onPress={signin} title="Login"/>
          <Button onPress={()=>{navigation.navigate("Register")}} containerStyle={styles.button} type="outline" title="Register" />
          <View style={{height:100}}/>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor:"white",
    },
    inputContainer: {
        width:300,
    },
    button: {
        width: 200,
        marginTop:10,
    },
})
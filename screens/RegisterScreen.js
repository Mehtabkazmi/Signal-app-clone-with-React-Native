import { StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native-web';
import { StatusBar } from 'expo-status-bar';
import { Button, Input,Text } from 'react-native-elements';
import { auth } from '../firebase';
const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Back to login",
        });
    }, [navigation]);
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || "https://media.istockphoto.com/photos/colorful-background-of-pastel-powder-explosionrainbow-color-dust-on-picture-id1180542165?k=20&m=1180542165&s=612x612&w=0&h=43hlhk8qdGYP4V-u3AAxD3kPDRIzHjMNWpr-VdBQ2Js=",
                });
            }).catch((error) => alert(error.message));
    };
  return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <StatusBar style='light' />
          <Text h3 style={{ marginBottom: 50 }}>RegisterScreen</Text>
          <View style={styles.inputContainer}>
              <Input placeholder='Ful name' autoFocus type="text"
                  value={name} onChangeText={(text) => setName(text)}/>
              <Input placeholder='Email' type="text"
                  value={email} onChangeText={(text) => setEmail(text)}/>
              <Input placeholder='Password' secureTextEntry type="password"
                  value={password} onChangeText={(text) => setPassword(text)}/>
              <Input placeholder='Image' type="text"
                  value={imageUrl} onChangeText={(text) => setImageUrl(text)}
                  onSubmitEditing={register}
                  />
          </View>
          <Button style={styles.button} raised title='Register' onPress={register} />
    </KeyboardAvoidingView>
  ) 
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300
    },
});
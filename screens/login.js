import React, { useState } from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Button,
  Alert
} from 'react-native';

import Constants from 'expo-constants'

export function LoginScreen({ setLoggedUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const usernamePlaceholder = 'username';
  const passwordPlaceholder = 'password';

  function logintoZamaraApp() {
    if (!username) {
      Alert.alert('username required')
      return
    }
    if (!password) {
      Alert.alert('passsword is required')
      return
    }
    setIsLoading(true);
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        setIsLoading(false)
        if (user.message) {
          Alert.alert('Invalid username or password')
          return
        }
        setLoggedUser(user)
      });
  }

  return (
    <SafeAreaView style={loginStyles.container}>
      <Text style={loginStyles.title}>Login To Zamara </Text>
      <TextInput
        style={loginStyles.input}
        value={username}
        placeholder={usernamePlaceholder}
        onChangeText={setUsername}
      />
      <TextInput
        style={loginStyles.input}
        value={password}
        placeholder={passwordPlaceholder}
        onChangeText={setPassword}
      // secureTextEntry={true}
      />
      <Button
        disabled={isLoading}
        onPress={logintoZamaraApp}
        title={isLoading ? 'please wait' : 'Login'}
      />

    </SafeAreaView>
  );
}

const loginStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    marginVertical: 5,
  },
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  button: {
    color: 'blue'
  }
});

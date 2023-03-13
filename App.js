import 'react-native-gesture-handler'
import React, { useState } from 'react';
import { LoginScreen } from './screens/login';
import { HomeScreen } from './screens/homescreen';

export default function App() {
  const [loggedUser, setLoggedUser] = useState(null)

  return (

    !loggedUser ? <LoginScreen setLoggedUser={setLoggedUser} /> : <HomeScreen user={loggedUser} setLoggedUser={setLoggedUser} />
  );
}


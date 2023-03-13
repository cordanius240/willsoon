import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native';
import MainStack from './navigate'
import Registr from './navigate'
import LoginScreen from './Loginpage';
import RegistrationScreen from './examplepp'
import PopupPageExample from './examplepp';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatList from './ChatList';

export default function App() {

  return (
    <SafeAreaProvider>
      <Registr />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

});

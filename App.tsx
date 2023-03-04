import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native';
import MainStack from './navigate'
import Registr from './navigate'
import LoginScreen from './Loginpage';
import RegistrationScreen from './examplepp'
import PopupPageExample from './examplepp';

export default function App() {

  return (
    <Registr />
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

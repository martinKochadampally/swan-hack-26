import React from 'react'
import { View, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { AppNavigator } from './src/navigation/AppNavigator'
import './global.css'

export default function App() {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <AppNavigator />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})
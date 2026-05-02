// App.tsx  ← replace the entire file with this
import React from 'react'
import { ClerkProvider } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store'
import { AppNavigator } from './src/navigation/AppNavigator'
import { StatusBar } from 'expo-status-bar'

const tokenCache = {
  async getToken(key: string) {
    try { return SecureStore.getItemAsync(key) }
    catch { return null }
  },
  async saveToken(key: string, value: string) {
    try { return SecureStore.setItemAsync(key, value) }
    catch { return }
  },
}

export default function App() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <StatusBar style="dark" />
      <AppNavigator />
    </ClerkProvider>
  )
}
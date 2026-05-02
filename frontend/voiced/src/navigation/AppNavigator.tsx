// src/navigation/AppNavigator.tsx
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LandingScreen } from '../screens/LandingScreen'
import { IntakeScreen } from '../screens/IntakeScreen'
import { RoadmapScreen } from '../screens/RoadmapScreen'
import { LetterScreen } from '../screens/LetterScreen'
import { DashboardScreen } from '../screens/DashboardScreen'
import { theme } from '../constants/theme'

export type RootStackParamList = {
  Landing:   undefined
  Intake:    undefined
  Roadmap:   { accommodations?: string[]; disability?: string }
  Letter:    { accommodations?: string[]; disability?: string }
  Dashboard: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: theme.colors.cream },
        }}
      >
        <Stack.Screen name="Landing"   component={LandingScreen} />
        <Stack.Screen name="Intake"    component={IntakeScreen} />
        <Stack.Screen name="Roadmap"   component={RoadmapScreen} />
        <Stack.Screen name="Letter"    component={LetterScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
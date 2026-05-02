// src/screens/RoadmapScreen.tsx
import React from 'react'
import {
  View, Text, ScrollView,
  StyleSheet, SafeAreaView, TouchableOpacity
} from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/AppNavigator'
import { Header } from '../components/layout/Header'
import { RoadmapStep } from '../components/roadmap/RoadmapStep'
import { ROADMAP_STEPS } from '../constants/isu'
import { theme } from '../constants/theme'

type Nav   = StackNavigationProp<RootStackParamList, 'Roadmap'>
type Route = RouteProp<RootStackParamList, 'Roadmap'>

export function RoadmapScreen() {
  const navigation = useNavigation<Nav>()
  const route = useRoute<Route>()
  const { accommodations = [], disability = '' } = route.params || {}

  return (
    <SafeAreaView style={styles.safe}>
      <Header showBack />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <Text style={styles.stepLabel}>Step 3 — Your roadmap</Text>
        <Text style={styles.title}>Here's exactly what happens next</Text>
        <Text style={styles.sub}>Estimated time to full approval: 5–7 business days</Text>

        {/* Timeline */}
        <View style={styles.card}>
          {ROADMAP_STEPS.map((step, i) => (
            <RoadmapStep
              key={step.number}
              step={step}
              isLast={i === ROADMAP_STEPS.length - 1}
            />
          ))}
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('Letter', { accommodations, disability })}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>View my letter →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('Dashboard')}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryBtnText}>Professor tracker →</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: theme.colors.cream },
  scroll:  { padding: 20, paddingBottom: 60 },
  stepLabel: {
    fontSize: 10, fontWeight: '600', letterSpacing: 0.8,
    textTransform: 'uppercase', color: theme.colors.soft, marginBottom: 6,
  },
  title: {
    fontFamily: theme.fonts.display, fontSize: 26,
    color: theme.colors.ink, letterSpacing: -0.5, marginBottom: 6,
  },
  sub: {
    fontSize: 14, color: theme.colors.soft,
    fontWeight: '300', marginBottom: 20,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 24,
    marginBottom: 16,
  },
  primaryBtn: {
    backgroundColor: theme.colors.ink,
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryBtnText: { color: 'white', fontSize: 15, fontWeight: '600' },
  secondaryBtn: {
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  secondaryBtnText: { color: theme.colors.ink, fontSize: 15 },
})
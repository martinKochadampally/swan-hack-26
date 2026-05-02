// src/screens/LandingScreen.tsx
import React from 'react'
import {
  View, Text, TouchableOpacity,
  StyleSheet, ScrollView, SafeAreaView
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/AppNavigator'
import { theme } from '../constants/theme'

type Nav = StackNavigationProp<RootStackParamList, 'Landing'>

export function LandingScreen() {
  const navigation = useNavigation<Nav>()

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Logo */}
        <Text style={styles.logo}>
          Voi<Text style={styles.logoAccent}>ced</Text>
        </Text>

        {/* Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Student accessibility platform</Text>
        </View>

        {/* Headline */}
        <Text style={styles.headline}>
          You deserve support.{'\n'}
          <Text style={styles.headlineAccent}>Let's get it for you.</Text>
        </Text>

        {/* Subtext */}
        <Text style={styles.sub}>
          Tell us what you're struggling with in plain English. We'll figure
          out what you're entitled to — and handle the paperwork.
        </Text>

        {/* CTA */}
        <TouchableOpacity
          style={styles.cta}
          onPress={() => navigation.navigate('Intake')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Start talking →</Text>
        </TouchableOpacity>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { num: '21%',    label: 'of students\nhave a disability' },
            { num: '92%',    label: 'never get the\nhelp they\'re owed' },
            { num: '<10min', label: 'to get your\nletter ready' },
          ].map(s => (
            <View key={s.num} style={styles.stat}>
              <Text style={styles.statNum}>{s.num}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* How it works */}
        <Text style={styles.sectionLabel}>How it works</Text>
        {[
          { n: '01', title: 'Just talk', desc: 'Click the mic and describe what you\'re struggling with. No forms, no jargon.' },
          { n: '02', title: 'We figure it out', desc: 'AI identifies what accommodations you likely qualify for at Iowa State.' },
          { n: '03', title: 'Letter sent', desc: 'Your formal request letter generates instantly. We track your professors.' },
        ].map(item => (
          <View key={item.n} style={styles.howCard}>
            <Text style={styles.howNum}>{item.n}</Text>
            <Text style={styles.howTitle}>{item.title}</Text>
            <Text style={styles.howDesc}>{item.desc}</Text>
          </View>
        ))}

        {/* Bottom CTA */}
        <TouchableOpacity
          style={[styles.cta, { backgroundColor: theme.colors.accent, marginTop: 24 }]}
          onPress={() => navigation.navigate('Intake')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Start your voice intake →</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.cream,
  },
  scroll: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 60,
  },
  logo: {
    fontFamily: theme.fonts.display,
    fontSize: 26,
    color: theme.colors.ink,
    letterSpacing: -0.5,
    marginBottom: 20,
    textAlign: 'center',
  },
  logoAccent: {
    color: theme.colors.accent,
  },
  badge: {
    alignSelf: 'center',
    backgroundColor: theme.colors.accentLight,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 100,
    marginBottom: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.accent,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  headline: {
    fontFamily: theme.fonts.display,
    fontSize: 36,
    lineHeight: 44,
    color: theme.colors.ink,
    letterSpacing: -1,
    textAlign: 'center',
    marginBottom: 16,
  },
  headlineAccent: {
    color: theme.colors.accent,
    fontStyle: 'italic',
  },
  sub: {
    fontSize: 16,
    color: theme.colors.soft,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 28,
    fontWeight: '300',
  },
  cta: {
    backgroundColor: theme.colors.ink,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 28,
  },
  ctaText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 20,
    marginBottom: 32,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statNum: {
    fontFamily: theme.fonts.display,
    fontSize: 22,
    color: theme.colors.accent,
    lineHeight: 28,
  },
  statLabel: {
    fontSize: 11,
    color: theme.colors.soft,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 15,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: theme.colors.soft,
    marginBottom: 14,
  },
  howCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 20,
    marginBottom: 10,
  },
  howNum: {
    fontFamily: theme.fonts.display,
    fontSize: 24,
    color: theme.colors.accent,
    opacity: 0.4,
    marginBottom: 8,
  },
  howTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.ink,
    marginBottom: 6,
  },
  howDesc: {
    fontSize: 13,
    color: theme.colors.soft,
    lineHeight: 20,
    fontWeight: '300',
  },
})
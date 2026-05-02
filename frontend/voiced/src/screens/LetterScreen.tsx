// src/screens/LetterScreen.tsx
import React, { useState } from 'react'
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, TouchableOpacity, Share, Linking
} from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../navigation/AppNavigator'
import { Header } from '../components/layout/Header'
import { LetterPreview } from '../components/letter/LetterPreview'
import { ISU } from '../constants/isu'
import { theme } from '../constants/theme'
import { LetterData } from '../types'

type Route = RouteProp<RootStackParamList, 'Letter'>

const DEMO_DATA: LetterData = {
  studentName:    'Jordan Williams',
  studentId:      'ISU-2024-88312',
  university:     'Iowa State University',
  diagnosis:      'Attention Deficit Hyperactivity Disorder (ADHD)',
  accommodations: ['Extended test time (1.5×)', 'Distraction-reduced testing room', 'Peer note-taking support'],
  doctorName:     'Dr. Maria Santos',
}

export function LetterScreen() {
  const route = useRoute<Route>()
  const { accommodations, disability } = route.params || {}

  const data: LetterData = {
    ...DEMO_DATA,
    diagnosis:      disability || DEMO_DATA.diagnosis,
    accommodations: accommodations?.length ? accommodations : DEMO_DATA.accommodations,
  }

  const letterText = buildLetterText(data)

  const handleShare = async () => {
    await Share.share({ message: letterText, title: 'Accommodation Request Letter' })
  }

  const handleEmail = () => {
    const subject = encodeURIComponent(`Accommodation Request — ${data.studentName}`)
    const body    = encodeURIComponent(letterText)
    Linking.openURL(`mailto:${ISU.sasEmail}?subject=${subject}&body=${body}`)
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Header showBack />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <Text style={styles.stepLabel}>Step 3b — Your accommodation letter</Text>
        <Text style={styles.title}>Ready to send</Text>
        <Text style={styles.sub}>
          Fields in green were filled in automatically. Review everything before sending.
        </Text>

        <LetterPreview data={data} />

        {/* Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.primaryBtn} onPress={handleShare} activeOpacity={0.85}>
            <Text style={styles.primaryBtnText}>Share / Download</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.accentBtn} onPress={handleEmail} activeOpacity={0.85}>
            <Text style={styles.accentBtnText}>Email to SAS →</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          This letter is a starting point. All accommodations are subject to review
          and approval by ISU Student Accessibility Services at {ISU.sasEmail}.
        </Text>

      </ScrollView>
    </SafeAreaView>
  )
}

function buildLetterText(data: LetterData): string {
  return `To the Office of Student Accessibility Services,

My name is ${data.studentName}, and I am a student at ${data.university} (Student ID: ${data.studentId}).

I am writing to formally request academic accommodations under the Americans with Disabilities Act (ADA) and Section 504 of the Rehabilitation Act of 1973. I have been diagnosed with ${data.diagnosis}, which significantly impacts my ability to perform under standard academic assessment conditions.

I respectfully request the following accommodations: ${data.accommodations.join(', ')}.

${data.doctorName ? `Supporting documentation completed by my physician, ${data.doctorName}, is attached.` : ''}

Sincerely,
${data.studentName}
${data.university}`
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
  buttons: { gap: 10, marginTop: 16, marginBottom: 14 },
  primaryBtn: {
    backgroundColor: theme.colors.ink,
    paddingVertical: 16, borderRadius: 100, alignItems: 'center',
  },
  primaryBtnText: { color: 'white', fontSize: 15, fontWeight: '600' },
  accentBtn: {
    paddingVertical: 16, borderRadius: 100, alignItems: 'center',
    borderWidth: 1.5, borderColor: theme.colors.accent,
  },
  accentBtnText: { color: theme.colors.accent, fontSize: 15, fontWeight: '600' },
  disclaimer: {
    fontSize: 11, color: theme.colors.soft,
    backgroundColor: theme.colors.muted,
    borderRadius: theme.radius.sm,
    padding: 12, lineHeight: 17,
  },
})
// src/components/letter/LetterPreview.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { LetterData } from '../../types'
import { theme } from '../../constants/theme'

export function LetterPreview({ data }: { data: LetterData }) {
  const G = ({ children }: { children: string }) => (
    <Text style={styles.generated}>{children}</Text>
  )

  return (
    <View style={styles.container}>
      <View style={styles.doc}>
        <Text style={styles.para}>To the Office of Student Accessibility Services,</Text>
        <Text style={styles.spacer} />
        <Text style={styles.para}>
          My name is <G>{data.studentName}</G>, and I am a student at{' '}
          <G>{data.university}</G> (Student ID: <G>{data.studentId}</G>).
        </Text>
        <Text style={styles.spacer} />
        <Text style={styles.para}>
          I am writing to formally request academic accommodations under the Americans
          with Disabilities Act (ADA) and Section 504 of the Rehabilitation Act of 1973.
          I have been diagnosed with <G>{data.diagnosis}</G>, which significantly impacts
          my ability to perform under standard academic assessment conditions.
        </Text>
        <Text style={styles.spacer} />
        <Text style={styles.para}>
          I respectfully request the following accommodations:{' '}
          <G>{data.accommodations.join(', ')}</G>.
        </Text>
        <Text style={styles.spacer} />
        {data.doctorName && (
          <>
            <Text style={styles.para}>
              Supporting documentation completed by my physician,{' '}
              <G>{data.doctorName}</G>, is attached.
            </Text>
            <Text style={styles.spacer} />
          </>
        )}
        <Text style={styles.para}>
          Sincerely,{'\n'}
          <G>{data.studentName}</G>{'\n'}
          <G>{data.university}</G>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 20,
  },
  doc: {
    backgroundColor: theme.colors.cream,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 20,
  },
  para: {
    fontFamily: 'Georgia',
    fontSize: 13,
    color: theme.colors.ink,
    lineHeight: 22,
  },
  generated: {
    color: theme.colors.accent,
    fontStyle: 'italic',
  },
  spacer: {
    height: 12,
  },
})
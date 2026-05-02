// src/components/intake/FollowUpFlow.tsx
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { theme } from '../../constants/theme'

const OPTIONS = [
  { label: 'Mostly affecting my studies and exams', value: 'academic' },
  { label: 'More of a general life thing right now', value: 'personal' },
  { label: 'Yes, I have a diagnosis', value: 'diagnosed' },
  { label: 'I suspect I might, not tested yet', value: 'suspected' },
  { label: 'Not sure', value: 'unsure' },
]

export function FollowUpFlow({
  question,
  onAnswer,
}: {
  question: string
  onAnswer: (answer: string) => void
}) {
  const isAcademic = question.toLowerCase().includes('academic')
  const options = isAcademic ? OPTIONS.slice(0, 2) : OPTIONS.slice(2)

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {options.map(opt => (
        <TouchableOpacity
          key={opt.value}
          onPress={() => onAnswer(opt.value)}
          style={styles.option}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>{opt.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    marginTop: 12,
    gap: 8,
  },
  question: {
    fontSize: 14,
    color: theme.colors.ink,
    lineHeight: 22,
    marginBottom: 6,
  },
  option: {
    padding: 12,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cream,
  },
  optionText: {
    fontSize: 13,
    color: theme.colors.ink,
  },
})
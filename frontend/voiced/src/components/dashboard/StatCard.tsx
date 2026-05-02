// src/components/dashboard/StatCard.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../../constants/theme'

export function StatCard({
  value,
  label,
  bg,
  color,
}: {
  value: number
  label: string
  bg: string
  color: string
}) {
  return (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: theme.radius.md,
    padding: 14,
    alignItems: 'center',
  },
  value: {
    fontFamily: 'Georgia',
    fontSize: 26,
    lineHeight: 32,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
})
// src/components/intake/AIResponseBubble.tsx
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../../constants/theme'

export function AIResponseBubble({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 14)
    return () => clearInterval(timer)
  }, [text])

  if (!text) return null

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>V</Text>
      </View>
      <Text style={styles.text}>{displayed}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    backgroundColor: theme.colors.accentLight,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: '#B7DFC9',
    padding: 14,
    marginTop: 12,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: '#1A3D2B',
    lineHeight: 22,
  },
})
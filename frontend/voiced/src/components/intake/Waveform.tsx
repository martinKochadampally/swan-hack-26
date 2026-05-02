// src/components/intake/Waveform.tsx
import React, { useEffect, useRef } from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { theme } from '../../constants/theme'

export function Waveform({ isActive }: { isActive: boolean }) {
  const bars = Array.from({ length: 10 }, (_, i) => ({
    anim: useRef(new Animated.Value(0.3)).current,
    delay: i * 80,
    height: 8 + (i % 5) * 5,
  }))

  useEffect(() => {
    if (isActive) {
      bars.forEach(({ anim, delay }) => {
        Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(anim, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0.2,
              duration: 400,
              useNativeDriver: true,
            }),
          ])
        ).start()
      })
    } else {
      bars.forEach(({ anim }) => anim.setValue(0.3))
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <View style={styles.container}>
      {bars.map((bar, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            {
              height: bar.height,
              transform: [{ scaleY: bar.anim }],
            },
          ]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 36,
  },
  bar: {
    width: 4,
    borderRadius: 4,
    backgroundColor: theme.colors.accent,
  },
})
// src/components/intake/MicButton.tsx
import React, { useEffect, useRef } from 'react'
import {
  TouchableOpacity, View, StyleSheet, Animated
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '../../constants/theme'

export function MicButton({
  isRecording,
  onPress,
}: {
  isRecording: boolean
  onPress: () => void
}) {
  const pulseAnim = useRef(new Animated.Value(1)).current
  const pulseOpacity = useRef(new Animated.Value(0.4)).current

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 2.2,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(pulseOpacity, {
              toValue: 0,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(pulseOpacity, {
              toValue: 0.4,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start()
    } else {
      pulseAnim.setValue(1)
      pulseOpacity.setValue(0.4)
    }
  }, [isRecording])

  return (
    <View style={styles.container}>
      {isRecording && (
        <Animated.View
          style={[
            styles.pulse,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseOpacity,
            },
          ]}
        />
      )}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={[
          styles.button,
          { backgroundColor: isRecording ? theme.colors.warn : theme.colors.ink },
        ]}
        accessibilityLabel={isRecording ? 'Stop recording' : 'Start recording'}
      >
        <Ionicons
          name={isRecording ? 'stop' : 'mic'}
          size={30}
          color="white"
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E07A5F',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
})
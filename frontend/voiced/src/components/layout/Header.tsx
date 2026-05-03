// src/components/layout/Header.tsx
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../../constants/theme'

export function Header({ showBack = false }: { showBack?: boolean }) {
  const navigation = useNavigation()

  if (!showBack && Platform.OS === 'web') return null

  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.back} />
      )}
      <Text style={styles.logo}>
        Voi<Text style={styles.logoAccent}>ced</Text>
      </Text>
      <View style={styles.back} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.cream,
  },
  logo: {
    fontFamily: theme.fonts.display,
    fontSize: 22,
    color: theme.colors.ink,
    letterSpacing: -0.5,
  },
  logoAccent: {
    color: theme.colors.accent,
  },
  back: {
    width: 60,
  },
  backText: {
    fontSize: 14,
    color: theme.colors.accent,
    fontWeight: '500',
  },
})
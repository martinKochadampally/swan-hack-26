import React from 'react'
import {
  View, ScrollView, StyleSheet, Platform
} from 'react-native'
import { theme } from '../../constants/theme'

export function PageWrapper({
  children,
  scrollable = true,
}: {
  children: React.ReactNode
  scrollable?: boolean
}) {
  const content = (
    <View style={styles.inner}>
      {children}
    </View>
  )

  if (scrollable) {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {content}
      </ScrollView>
    )
  }

  return <View style={styles.container}>{content}</View>
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.cream,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
    paddingBottom: 60,
  },
  inner: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 900 : undefined,
    paddingHorizontal: Platform.OS === 'web' ? 32 : 20,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.cream,
  },
})
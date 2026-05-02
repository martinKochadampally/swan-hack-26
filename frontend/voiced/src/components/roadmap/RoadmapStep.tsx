// src/components/roadmap/RoadmapStep.tsx
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { RoadmapStepType } from '../../types'
import { theme } from '../../constants/theme'

export function RoadmapStep({
  step,
  isLast,
}: {
  step: RoadmapStepType
  isLast: boolean
}) {
  const isDone   = step.status === 'done'
  const isActive = step.status === 'active'

  const dotBg =
    isDone   ? theme.colors.accent :
    isActive ? theme.colors.ink    : theme.colors.muted

  const badgeBg    = isDone ? theme.colors.accentLight : theme.colors.yellowLight
  const badgeColor = isDone ? theme.colors.accent      : '#92601A'

  return (
    <View style={styles.row}>
      {/* Left — dot + line */}
      <View style={styles.left}>
        <View style={[styles.dot, { backgroundColor: dotBg }]}>
          {isDone ? (
            <Text style={styles.dotCheck}>✓</Text>
          ) : (
            <Text style={styles.dotNum}>{step.number}</Text>
          )}
        </View>
        {!isLast && (
          <View style={[
            styles.line,
            { backgroundColor: isDone ? theme.colors.accentMid : theme.colors.border }
          ]} />
        )}
      </View>

      {/* Right — content */}
      <View style={[styles.content, isLast && { paddingBottom: 0 }]}>
        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.desc}>{step.description}</Text>

        {step.badge && (
          <View style={[styles.badge, { backgroundColor: badgeBg }]}>
            <Text style={[styles.badgeText, { color: badgeColor }]}>{step.badge}</Text>
          </View>
        )}

        {step.link && (
          <TouchableOpacity onPress={() => Linking.openURL(step.link!)}>
            <Text style={styles.link}>Open page →</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  left: {
    alignItems: 'center',
    width: 32,
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  dotCheck: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  dotNum: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: 4,
    marginBottom: -4,
  },
  content: {
    flex: 1,
    paddingBottom: 28,
    paddingTop: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.ink,
    marginBottom: 4,
  },
  desc: {
    fontSize: 13,
    color: theme.colors.soft,
    lineHeight: 20,
    fontWeight: '300',
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 100,
    marginBottom: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  link: {
    fontSize: 12,
    color: theme.colors.accent,
    fontWeight: '600',
  },
})
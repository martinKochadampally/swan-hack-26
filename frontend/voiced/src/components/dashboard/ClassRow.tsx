// src/components/dashboard/ClassRow.tsx
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { ClassRow as ClassRowType, ClassStatus } from '../../types'
import { theme } from '../../constants/theme'

const CONFIG: Record<ClassStatus, {
  dot: string; pillBg: string; pillText: string; label: string
}> = {
  confirmed: { dot: theme.colors.green,  pillBg: theme.colors.greenLight,  pillText: '#1A6640', label: 'Confirmed' },
  sent:      { dot: theme.colors.yellow, pillBg: theme.colors.yellowLight, pillText: '#92601A', label: 'Sent — no reply' },
  not_sent:  { dot: theme.colors.red,    pillBg: theme.colors.redLight,    pillText: '#8B2D1A', label: 'Not sent yet' },
}

export function ClassRow({
  row,
  onSend,
  onFollowUp,
}: {
  row: ClassRowType
  onSend: (id: string) => void
  onFollowUp: (id: string) => void
}) {
  const config = CONFIG[row.status]
  const [loading, setLoading] = useState(false)

  const handleAction = async () => {
    setLoading(true)
    if (row.status === 'not_sent') await onSend(row.id)
    else if (row.status === 'sent') await onFollowUp(row.id)
    setLoading(false)
  }

  return (
    <View style={styles.row}>
      <View style={[styles.dot, { backgroundColor: config.dot }]} />

      <View style={styles.info}>
        <Text style={styles.className} numberOfLines={1}>{row.className}</Text>
        <Text style={styles.professor}>{row.professorName}</Text>
      </View>

      <View style={[styles.pill, { backgroundColor: config.pillBg }]}>
        <Text style={[styles.pillText, { color: config.pillText }]}>{config.label}</Text>
      </View>

      {row.status !== 'confirmed' && (
        <TouchableOpacity
          onPress={handleAction}
          disabled={loading}
          style={[
            styles.actionBtn,
            {
              borderColor:       row.status === 'sent' ? theme.colors.warn   : theme.colors.accent,
              backgroundColor:   row.status === 'sent' ? theme.colors.warnLight : theme.colors.accentLight,
              opacity:           loading ? 0.6 : 1,
            },
          ]}
        >
          <Text style={[
            styles.actionText,
            { color: row.status === 'sent' ? theme.colors.warn : theme.colors.accent }
          ]}>
            {loading ? '...' : row.status === 'sent' ? 'Follow up' : 'Send'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cream,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    flexShrink: 0,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  className: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.ink,
  },
  professor: {
    fontSize: 11,
    color: theme.colors.soft,
    marginTop: 2,
  },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    flexShrink: 0,
  },
  pillText: {
    fontSize: 10,
    fontWeight: '600',
  },
  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
    flexShrink: 0,
  },
  actionText: {
    fontSize: 11,
    fontWeight: '600',
  },
})
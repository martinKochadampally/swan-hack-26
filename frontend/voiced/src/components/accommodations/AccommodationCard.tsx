// src/components/accommodations/AccommodationCard.tsx
import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { AccommodationItem } from '../../types'
import { theme } from '../../constants/theme'

export function AccommodationCard({
  item,
  onToggle,
}: {
  item: AccommodationItem
  onToggle: (id: string) => void
}) {
  return (
    <TouchableOpacity
      onPress={() => onToggle(item.id)}
      activeOpacity={0.8}
      style={[
        styles.card,
        item.selected && styles.cardSelected,
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: item.selected }}
    >
      {item.selected && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    flex: 1,
    position: 'relative',
  },
  cardSelected: {
    backgroundColor: theme.colors.accentLight,
    borderColor: theme.colors.accent,
    borderWidth: 2,
  },
  checkmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.ink,
    marginBottom: 4,
  },
  desc: {
    fontSize: 11,
    color: theme.colors.soft,
    lineHeight: 16,
  },
})
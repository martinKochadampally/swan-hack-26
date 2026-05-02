import React, { useState } from 'react'
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Header } from '../components/layout/Header'
import { ClassRow } from '../components/dashboard/ClassRow'
import { StatCard } from '../components/dashboard/StatCard'
import { DEMO_CLASSES } from '../constants/isu'
import { generateProfessorEmail, generateFollowUpEmail } from '../lib/api'
import { ClassRow as ClassRowType, ClassStatus } from '../types'
import { theme } from '../constants/theme'

export function DashboardScreen() {
  const navigation = useNavigation()
  const [classes, setClasses] = useState<ClassRowType[]>(DEMO_CLASSES)
  const [emailPreview, setEmailPreview] = useState<{
    subject: string
    body: string
    className: string
  } | null>(null)

  const updateStatus = (id: string, status: ClassStatus) => {
    setClasses(prev => prev.map(c => c.id === id ? { ...c, status } : c))
  }

  const handleSend = async (id: string) => {
    const row = classes.find(c => c.id === id)
    if (!row) return
    const result = await generateProfessorEmail({
      studentName:    'Jordan Williams',
      professorName:  row.professorName,
      className:      row.className,
      accommodations: ['Extended test time (1.5×)', 'Distraction-reduced room'],
    })
    setEmailPreview({
      subject:   result.emailSubject,
      body:      result.emailBody,
      className: row.className,
    })
    updateStatus(id, 'sent')
  }

  const handleFollowUp = async (id: string) => {
    const row = classes.find(c => c.id === id)
    if (!row) return
    const result = await generateFollowUpEmail({
      studentName:    'Jordan Williams',
      professorName:  row.professorName,
      className:      row.className,
      accommodations: ['Extended test time (1.5×)', 'Distraction-reduced room'],
    })
    setEmailPreview({
      subject:   result.emailSubject,
      body:      result.emailBody,
      className: row.className,
    })
  }

  const confirmed = classes.filter(c => c.status === 'confirmed').length
  const sent      = classes.filter(c => c.status === 'sent').length
  const notSent   = classes.filter(c => c.status === 'not_sent').length

  return (
    <SafeAreaView style={styles.safe}>
      <Header showBack />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <Text style={styles.stepLabel}>Step 4 — Professor tracker</Text>
        <Text style={styles.title}>Your accommodations by class</Text>
        <Text style={styles.sub}>
          Track which professors have acknowledged your rights.
        </Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard value={confirmed} label="Confirmed"      bg={theme.colors.greenLight}  color="#1A6640" />
          <StatCard value={sent}      label="Awaiting reply" bg={theme.colors.yellowLight} color="#92601A" />
          <StatCard value={notSent}   label="Not sent"       bg={theme.colors.redLight}    color="#8B2D1A" />
        </View>

        {/* Class rows */}
        <View style={styles.card}>
          {classes.map(row => (
            <ClassRow
              key={row.id}
              row={row}
              onSend={handleSend}
              onFollowUp={handleFollowUp}
            />
          ))}
        </View>

        {/* Email preview */}
        {emailPreview && (
          <View style={styles.emailCard}>
            <Text style={styles.emailLabel}>
              Generated email — {emailPreview.className}
            </Text>
            <Text style={styles.emailSubject}>
              Subject: {emailPreview.subject}
            </Text>
            <View style={styles.emailBody}>
              <Text style={styles.emailBodyText}>{emailPreview.body}</Text>
            </View>
            <TouchableOpacity
              style={styles.dismissBtn}
              onPress={() => setEmailPreview(null)}
            >
              <Text style={styles.dismissText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Back nav */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backLink}
        >
          <Text style={styles.backLinkText}>← View my letter</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: theme.colors.cream },
  scroll: { padding: 20, paddingBottom: 60 },
  stepLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: theme.colors.soft,
    marginBottom: 6,
  },
  title: {
    fontFamily: theme.fonts.display,
    fontSize: 26,
    color: theme.colors.ink,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  sub: {
    fontSize: 14,
    color: theme.colors.soft,
    fontWeight: '300',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    gap: 10,
    marginBottom: 16,
  },
  emailCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 20,
    marginBottom: 16,
    gap: 10,
  },
  emailLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: theme.colors.soft,
  },
  emailSubject: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.soft,
  },
  emailBody: {
    backgroundColor: theme.colors.cream,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 12,
  },
  emailBodyText: {
    fontSize: 12,
    color: theme.colors.ink,
    lineHeight: 20,
  },
  dismissBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  dismissText: {
    fontSize: 12,
    color: theme.colors.soft,
  },
  backLink:     { alignItems: 'center', paddingVertical: 12 },
  backLinkText: { fontSize: 13, color: theme.colors.accent, fontWeight: '600' },
})
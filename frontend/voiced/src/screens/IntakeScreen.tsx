// src/screens/IntakeScreen.tsx
import React, { useState } from 'react'
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/AppNavigator'
import { Header } from '../components/layout/Header'
import { MicButton } from '../components/intake/MicButton'
import { Waveform } from '../components/intake/Waveform'
import { AIResponseBubble } from '../components/intake/AIResponseBubble'
import { FollowUpFlow } from '../components/intake/FollowUpFlow'
import { AccommodationCard } from '../components/accommodations/AccommodationCard'
import { useMicrophone } from '../hooks/useMicrophone'
import { transcribeAudio, analyzeTranscript } from '../lib/api'
import { ACCOMMODATIONS } from '../constants/isu'
import { AccommodationItem, AnalyzeResponse } from '../types'
import { theme } from '../constants/theme'

type Nav = StackNavigationProp<RootStackParamList, 'Intake'>

type State = 'idle'|'recording'|'transcribing'|'analyzing'|'followup'|'cards'|'counselling'|'health'|'error'

export function IntakeScreen() {
  const navigation = useNavigation<Nav>()
  const { isRecording, audioUri, toggleRecording } = useMicrophone()
  const [state, setState] = useState<State>('idle')
  const [transcript, setTranscript] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [followUpQ, setFollowUpQ] = useState('')
  const [cards, setCards] = useState<AccommodationItem[]>(ACCOMMODATIONS)
  const [disability, setDisability] = useState('')

  const handleMic = async () => {
    if (isRecording) {
      toggleRecording()
      setState('transcribing')
      if (!audioUri) { setState('error'); return }
      try {
        const { transcript: text } = await transcribeAudio(audioUri)
        setTranscript(text)
        setState('analyzing')
        const result: AnalyzeResponse = await analyzeTranscript(text)
        setAiResponse(result.aiResponse)
        setDisability(result.disability || '')
        if (result.needsFollowUp && result.followUpQuestion) {
          setFollowUpQ(result.followUpQuestion)
          setState('followup')
        } else if (result.routing === 'counselling') {
          setState('counselling')
        } else if (result.routing === 'health-center') {
          setState('health')
        } else {
          if (result.accommodations) {
            setCards(ACCOMMODATIONS.map(c => ({
              ...c,
              selected: result.accommodations!.some(a =>
                c.name.toLowerCase().includes(a.toLowerCase().split(' ')[0])
              ),
            })))
          }
          setState('cards')
        }
      } catch {
        setState('error')
      }
    } else {
      toggleRecording()
      setState('recording')
    }
  }

  const handleFollowUp = async (answer: string) => {
    setState('analyzing')
    try {
      const enriched = `${transcript} [Answer: ${answer}]`
      const result = await analyzeTranscript(enriched)
      setAiResponse(result.aiResponse)
      setDisability(result.disability || '')
      if (result.routing === 'counselling') setState('counselling')
      else if (result.routing === 'health-center') setState('health')
      else setState('cards')
    } catch {
      setState('error')
    }
  }

  const toggleCard = (id: string) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, selected: !c.selected } : c))
  }

  const selected = cards.filter(c => c.selected)

  const hintText = {
    idle:         'Tap the mic and start talking',
    recording:    'Listening... tap again to stop',
    transcribing: 'Transcribing your words...',
    analyzing:    'Thinking about what you said...',
    followup:     'One quick question...',
    cards:        'Here\'s what you likely qualify for',
    counselling:  '',
    health:       '',
    error:        'Something went wrong — try again',
  }[state]

  return (
    <SafeAreaView style={styles.safe}>
      <Header showBack />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Step label */}
        <Text style={styles.stepLabel}>Step 1 — Tell us what's going on</Text>
        <Text style={styles.title}>Just talk to us</Text>
        <Text style={styles.sub}>No forms. No jargon. Describe what's been hard.</Text>

        {/* Mic card */}
        <View style={styles.micCard}>
          <View style={styles.micArea}>
            <MicButton isRecording={isRecording} onPress={handleMic} />
            <Waveform isActive={isRecording} />
            {hintText ? <Text style={styles.hint}>{hintText}</Text> : null}
          </View>

          {/* Transcript */}
          <View style={styles.transcriptBox}>
            <Text style={[
              styles.transcriptText,
              !transcript && styles.transcriptPlaceholder
            ]}>
              {transcript || 'Your words will appear here as you speak...'}
            </Text>
          </View>

          {/* AI response */}
          {aiResponse ? <AIResponseBubble text={aiResponse} /> : null}

          {/* Follow-up */}
          {state === 'followup' && followUpQ
            ? <FollowUpFlow question={followUpQ} onAnswer={handleFollowUp} />
            : null
          }

          {/* Routing — counselling */}
          {state === 'counselling' && (
            <View style={styles.routeBox}>
              <Text style={styles.routeText}>
                It sounds like speaking to someone might help most right now.{' '}
                ISU Student Counseling Services is free for all ISU students.
              </Text>
            </View>
          )}

          {/* Routing — health center */}
          {state === 'health' && (
            <View style={[styles.routeBox, { backgroundColor: theme.colors.yellowLight }]}>
              <Text style={[styles.routeText, { color: '#5C3D00' }]}>
                Getting evaluated is a great first step. Thielen Student Health Center
                on campus can help. Once you have a diagnosis, come back and we'll have
                your letter ready in minutes.
              </Text>
            </View>
          )}
        </View>

        {/* Accommodation cards */}
        {state === 'cards' && (
          <>
            <Text style={[styles.stepLabel, { marginTop: 28 }]}>
              Step 2 — What you likely qualify for
            </Text>

            <View style={styles.cardsGrid}>
              {cards.map((card, i) => (
                <View key={card.id} style={styles.cardWrapper}>
                  <AccommodationCard item={card} onToggle={toggleCard} />
                </View>
              ))}
            </View>

            {/* Disclaimer */}
            <Text style={styles.disclaimer}>
              These are likely qualifications based on your description.
              All accommodations are subject to review and approval by ISU Student Accessibility Services.
            </Text>

            {/* Continue button */}
            {selected.length > 0 && (
              <TouchableOpacity
                style={styles.continueBtn}
                onPress={() => navigation.navigate('Roadmap', {
                  accommodations: selected.map(c => c.name),
                  disability,
                })}
                activeOpacity={0.85}
              >
                <Text style={styles.continueBtnText}>
                  See your roadmap → ({selected.length} selected)
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.cream },
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
  micCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 20,
  },
  micArea: {
    alignItems: 'center',
    gap: 14,
    paddingVertical: 28,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.cream,
    marginBottom: 16,
  },
  hint: {
    fontSize: 12,
    color: theme.colors.soft,
  },
  transcriptBox: {
    backgroundColor: theme.colors.cream,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
    minHeight: 60,
  },
  transcriptText: {
    fontSize: 14,
    color: theme.colors.ink,
    lineHeight: 22,
  },
  transcriptPlaceholder: {
    color: theme.colors.soft,
    fontStyle: 'italic',
    fontWeight: '300',
  },
  routeBox: {
    backgroundColor: theme.colors.accentLight,
    borderRadius: theme.radius.md,
    padding: 14,
    marginTop: 12,
  },
  routeText: {
    fontSize: 13,
    color: '#1A3D2B',
    lineHeight: 20,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
    marginBottom: 14,
  },
  cardWrapper: {
    width: '48%',
  },
  disclaimer: {
    fontSize: 11,
    color: theme.colors.soft,
    backgroundColor: theme.colors.muted,
    borderRadius: theme.radius.sm,
    padding: 12,
    lineHeight: 17,
    marginBottom: 16,
  },
  continueBtn: {
    backgroundColor: theme.colors.ink,
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
  },
  continueBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
})
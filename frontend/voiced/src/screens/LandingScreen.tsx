import React, { useRef } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  useWindowDimensions,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/AppNavigator'
import { ACCOMMODATIONS, DEMO_CLASSES, ISU, ROADMAP_STEPS } from '../constants/isu'
import { theme } from '../constants/theme'

type Nav = StackNavigationProp<RootStackParamList, 'Landing'>

export function LandingScreen() {
  const navigation = useNavigation<Nav>()
  const scrollRef = useRef<ScrollView>(null)
  const { width } = useWindowDimensions()
  
  const isMobile = width < 768
  const isTablet = width >= 768 && width < 1024
  const isDesktop = width >= 1024

  const selectedIds = new Set(['extended-time', 'distraction-reduced', 'note-taking'])

  const scrollToHowItWorks = () => {
    scrollRef.current?.scrollTo({ y: isMobile ? 620 : 740, animated: true })
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.backgroundGlowLeft} />
        <View style={styles.backgroundGlowRight} />

        <View style={styles.page}>
          <View style={styles.topNav}>
            <Text style={styles.logo}>
              Voi<Text style={styles.logoAccent}>ced</Text>
            </Text>

            {!isMobile && (
              <View style={styles.navLinks}>
                <TouchableOpacity onPress={scrollToHowItWorks} activeOpacity={0.8}>
                  <Text style={styles.navLink}>How it works</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} activeOpacity={0.8}>
                  <Text style={styles.navLink}>My accommodations</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Intake')} activeOpacity={0.85}>
                  <Text style={styles.navButtonText}>Get started -&gt;</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.hero}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Student accessibility platform - Iowa State University</Text>
            </View>

            <Text style={styles.headline}>
              You are not alone.{"\n"}
              <Text style={styles.headlineAccent}>And you deserve help.</Text>
            </Text>

            <Text style={styles.sub}>
              Tell us what you are struggling with - in your own words, in your own time.
              We will figure out what support you are legally entitled to, and handle everything else.
            </Text>

            <View style={styles.heroButtons}>
              <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Intake')} activeOpacity={0.85}>
                <Text style={styles.primaryButtonText}>Start talking -&gt;</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} onPress={scrollToHowItWorks} activeOpacity={0.85}>
                <Text style={styles.secondaryButtonText}>See how it works</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.storyStrip}>
            <Text style={styles.storyText}>
              Jordan failed his first CS midterm at Iowa State. He studied for 3 days straight.
              He did not know who to call. 92% of students like Jordan never get the help they are owed.
            </Text>
          </View>

          <View style={styles.statsRow}>
            {[
              { num: '21%', label: 'of college students have a disability' },
              { num: '92%', label: 'never get the legal help they are entitled to' },
              { num: '<10 min', label: 'to get your letter ready to send' },
            ].map((stat) => (
              <View key={stat.num} style={styles.stat}>
                <Text style={styles.statNum}>{stat.num}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>How it works</Text>
            <View style={styles.howGrid}>
              {[
                { n: '01', title: 'Just talk', desc: 'Click the mic and describe what you are struggling with in plain English. No forms, no jargon.' },
                { n: '02', title: 'We figure it out', desc: 'AI identifies what accommodations you likely qualify for at Iowa State and what to do next.' },
                { n: '03', title: 'Letter sent', desc: 'Your formal request letter generates instantly. We track your professors so nothing falls through.' },
              ].map((item) => (
                <View key={item.n} style={styles.howCard}>
                  <Text style={styles.howNum}>{item.n}</Text>
                  <Text style={styles.howTitle}>{item.title}</Text>
                  <Text style={styles.howDesc}>{item.desc}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.panel}>
              <Text style={styles.stepLabel}>Step 1 - Tell us what is going on</Text>
              <Text style={styles.panelTitle}>Just talk to us</Text>
              <Text style={styles.panelSub}>
                No forms. No appointments. No jargon. Just describe what has been hard - we will take it from there.
              </Text>

              <View style={styles.micPanel}>
                <View style={styles.micButtonMock}>
                  <Text style={styles.micIcon}>🎙</Text>
                </View>
                <Text style={styles.micHint}>Tap the mic and start talking</Text>
              </View>

              <View style={styles.transcriptBox}>
                <Text style={styles.transcriptPlaceholder}>Your words will appear here as you speak...</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.stepLabel}>Step 2 - What you likely qualify for</Text>
            <Text style={styles.sectionTitle}>Based on what you described, select the ones that apply.</Text>
            <View style={styles.cardsGrid}>
              {ACCOMMODATIONS.map((item) => {
                const selected = selectedIds.has(item.id)
                return (
                  <View key={item.id} style={[styles.accommodationCard, selected && styles.accommodationCardSelected]}>
                    <View style={styles.cardTopRow}>
                      <Text style={styles.cardIcon}>{item.icon}</Text>
                      {selected ? (
                        <View style={styles.checkPill}>
                          <Text style={styles.checkPillText}>✓</Text>
                        </View>
                      ) : null}
                    </View>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardDesc}>{item.description}</Text>
                  </View>
                )
              })}
            </View>
            <View style={styles.disclaimer}>
              <Text style={styles.disclaimerText}>
                These are likely qualifications based on your description. All accommodations are subject to review and approval by ISU Student Accessibility Services at {ISU.sasEmail}.
              </Text>
            </View>
          </View>

          <View style={[styles.dualSection, { flexDirection: isMobile ? 'column' : 'row' }]}>
            <View style={[styles.leftColumn, { flex: isMobile ? undefined : 1 }]}>
              <Text style={styles.stepLabel}>Step 3 - Your roadmap</Text>
              <Text style={styles.sectionTitle}>What happens next</Text>
              <Text style={styles.panelSub}>Estimated time to full approval: {ISU.sasResponseDays}</Text>

              <View style={styles.timelineCard}>
                {ROADMAP_STEPS.map((step) => (
                  <View key={step.number} style={styles.timelineRow}>
                    <View
                      style={[
                        styles.timelineDot,
                        step.status === 'done'
                          ? styles.timelineDotDone
                          : step.status === 'active'
                            ? styles.timelineDotActive
                            : styles.timelineDotTodo,
                      ]}
                    >
                      <Text style={styles.timelineDotText}>{step.status === 'done' ? '✓' : step.number}</Text>
                    </View>
                    <View style={styles.timelineContent}>
                      <Text style={styles.timelineTitle}>{step.title}</Text>
                      <Text style={styles.timelineDesc}>{step.description}</Text>
                      {step.badge ? (
                        <View style={styles.statusPill}>
                          <Text style={styles.statusPillText}>{step.badge}</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.rightColumn}>
              <Text style={styles.stepLabel}>Step 4 - Professor tracker</Text>
              <Text style={styles.sectionTitle}>Your accommodations by class</Text>
              <Text style={styles.panelSub}>We track who has acknowledged your rights - and follow up on those who have not.</Text>

              <View style={styles.trackerCard}>
                {DEMO_CLASSES.map((row) => (
                  <View key={row.id} style={styles.classRow}>
                    <View style={styles.classTextGroup}>
                      <Text style={styles.className}>{row.className}</Text>
                      <Text style={styles.professor}>{row.professorName}</Text>
                    </View>
                    <View
                      style={[
                        styles.classStatus,
                        row.status === 'confirmed'
                          ? styles.classStatusConfirmed
                          : row.status === 'sent'
                            ? styles.classStatusSent
                            : styles.classStatusPending,
                      ]}
                    >
                      <Text style={styles.classStatusText}>{row.status === 'confirmed' ? 'Confirmed' : row.status === 'sent' ? 'No reply' : 'Not sent'}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.stepLabel}>Step 3b - Your generated letter</Text>
            <Text style={styles.sectionTitle}>Accommodation request letter</Text>
            <Text style={styles.panelSub}>Ready to download or email directly to {ISU.sasEmail}</Text>

            <View style={styles.letterCard}>
              <Text style={styles.letterParagraph}>To the Office of Student Accessibility Services,</Text>
              <Text style={styles.letterParagraph}>
                My name is <Text style={styles.letterAccent}>Jordan Williams</Text>, and I am a{' '}
                <Text style={styles.letterAccent}>first-year student at Iowa State University</Text> (Student ID:{' '}
                <Text style={styles.letterAccent}>ISU-2024-88312</Text>).
              </Text>
              <Text style={styles.letterParagraph}>
                I am writing to formally request academic accommodations under the Americans with Disabilities Act (ADA) and
                Section 504 of the Rehabilitation Act of 1973. I have been diagnosed with{' '}
                <Text style={styles.letterAccent}>Attention Deficit Hyperactivity Disorder (ADHD)</Text>, which significantly
                impacts my ability to <Text style={styles.letterAccent}>complete timed assessments and sustain focus under pressure</Text>.
              </Text>
              <Text style={styles.letterParagraph}>
                I respectfully request the following accommodations:{' '}
                <Text style={styles.letterAccent}>extended test time (1.5x), a distraction-reduced testing environment, and peer note-taking support.</Text>
              </Text>
              <Text style={styles.letterParagraph}>
                Supporting documentation completed by my physician, <Text style={styles.letterAccent}>Dr. Maria Santos</Text>, is attached.
                I am happy to schedule a meeting at your office to discuss my needs further.
              </Text>
              <Text style={styles.letterParagraph}>
                Sincerely,{"\n"}
                <Text style={styles.letterAccent}>Jordan Williams</Text>{"\n"}
                <Text style={styles.letterAccent}>Iowa State University - Class of 2028</Text>
              </Text>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Dashboard')} activeOpacity={0.85}>
                <Text style={styles.primaryButtonText}>Download PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Intake')} activeOpacity={0.85}>
                <Text style={styles.secondaryButtonText}>Edit letter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Intake')} activeOpacity={0.85}>
                <Text style={styles.secondaryButtonText}>Email to SAS -&gt;</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footerQuote}>
            <Text style={styles.footerQuoteText}>
              "Jordan knew his rights in 8 minutes. Without Voiced, he might have dropped out."
            </Text>
            <Text style={styles.footerByline}>- Built at SwanHacks 2025 - Accessibility for Students track</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.cream,
  },
  scrollView: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 60,
    alignItems: 'center',
    backgroundColor: theme.colors.cream,
    flexGrow: 1,
    width: '100%',
  },
  backgroundGlowLeft: {
    position: 'absolute',
    top: 120,
    left: -120,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#F4DDCF',
    opacity: 0.34,
  },
  backgroundGlowRight: {
    position: 'absolute',
    top: 420,
    right: -100,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#EBC8B3',
    opacity: 0.22,
  },
  page: {
    width: '100%',
    maxWidth: 1120,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: 32,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
  },
  navLink: {
    fontSize: 14,
    color: theme.colors.soft,
    fontWeight: '500',
  },
  navButton: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  logo: {
    fontFamily: theme.fonts.display,
    fontSize: 24,
    color: theme.colors.ink,
    letterSpacing: -0.5,
  },
  logoAccent: {
    color: theme.colors.accent,
    fontStyle: 'italic',
  },
  badge: {
    alignSelf: 'center',
    backgroundColor: theme.colors.accentLight,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 100,
    marginBottom: 18,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.accent,
    letterSpacing: 0.2,
  },
  headline: {
    fontFamily: theme.fonts.display,
    fontSize: 42,
    lineHeight: 48,
    color: theme.colors.ink,
    letterSpacing: -1.1,
    textAlign: 'center',
    marginBottom: 14,
  },
  headlineAccent: {
    color: theme.colors.accent,
    fontStyle: 'italic',
  },
  sub: {
    fontSize: 16,
    color: theme.colors.soft,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 26,
    fontWeight: '400',
    maxWidth: 700,
    alignSelf: 'center',
  },
  hero: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 30,
  },
  heroButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    shadowColor: '#A8653C',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  secondaryButtonText: {
    color: theme.colors.ink,
    fontSize: 15,
    fontWeight: '700',
  },
  storyStrip: {
    backgroundColor: '#3D1E12',
    paddingHorizontal: 18,
    paddingVertical: 22,
    marginHorizontal: -16,
    marginTop: 10,
  },
  storyText: {
    color: '#F8EDE5',
    textAlign: 'center',
    fontFamily: theme.fonts.display,
    fontStyle: 'italic',
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 840,
    alignSelf: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    marginBottom: 40,
    flexWrap: 'wrap',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
    minWidth: 120,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    borderBottomWidth: 0,
    borderBottomColor: theme.colors.border,
  },
  statNum: {
    fontFamily: theme.fonts.display,
    fontSize: 26,
    color: theme.colors.accent,
    lineHeight: 30,
  },
  statLabel: {
    fontSize: 11,
    color: theme.colors.soft,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 15,
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: theme.colors.accent,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: theme.fonts.display,
    fontSize: 24,
    color: theme.colors.ink,
    marginBottom: 16,
    lineHeight: 30,
  },
  howGrid: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  howCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 18,
    flex: 1,
    minWidth: 250,
  },
  howNum: {
    fontFamily: theme.fonts.display,
    fontSize: 20,
    color: theme.colors.accent,
    opacity: 0.4,
    marginBottom: 8,
  },
  howTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.ink,
    marginBottom: 6,
  },
  howDesc: {
    fontSize: 13,
    color: theme.colors.soft,
    lineHeight: 19,
    fontWeight: '400',
  },
  panel: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 28,
    padding: 18,
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: theme.colors.accent,
    marginBottom: 6,
  },
  panelTitle: {
    fontFamily: theme.fonts.display,
    fontSize: 22,
    color: theme.colors.ink,
    marginBottom: 6,
  },
  panelSub: {
    fontSize: 13,
    color: theme.colors.soft,
    lineHeight: 20,
    marginBottom: 16,
  },
  micPanel: {
    backgroundColor: '#F2EAE0',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  micButtonMock: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3D1E12',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  micIcon: {
    fontSize: 22,
  },
  micHint: {
    fontSize: 13,
    color: theme.colors.soft,
  },
  transcriptBox: {
    backgroundColor: '#F4EBDD',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  transcriptPlaceholder: {
    color: '#8A7668',
    fontSize: 14,
    fontStyle: 'italic',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
    columnGap: 10,
  },
  accommodationCard: {
    width: '48%',
    minHeight: 130,
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
  },
  accommodationCardSelected: {
    backgroundColor: '#F7E6DB',
    borderColor: theme.colors.accent,
    borderWidth: 1.5,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardIcon: {
    fontSize: 20,
  },
  checkPill: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  cardTitle: {
    fontSize: 15,
    color: theme.colors.ink,
    fontWeight: '700',
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 12,
    color: theme.colors.soft,
    lineHeight: 17,
  },
  disclaimer: {
    backgroundColor: theme.colors.muted,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  disclaimerText: {
    fontSize: 11,
    lineHeight: 16,
    color: theme.colors.soft,
  },
  dualSection: {
    gap: 14,
    marginBottom: 32,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  timelineCard: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 20,
    padding: 16,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  timelineDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  timelineDotDone: {
    backgroundColor: theme.colors.accent,
  },
  timelineDotActive: {
    backgroundColor: theme.colors.ink,
  },
  timelineDotTodo: {
    backgroundColor: theme.colors.muted,
  },
  timelineDotText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 15,
    color: theme.colors.ink,
    fontWeight: '700',
    marginBottom: 4,
  },
  timelineDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: theme.colors.soft,
    marginBottom: 6,
  },
  statusPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: theme.colors.accentLight,
  },
  statusPillText: {
    fontSize: 10,
    color: theme.colors.accent,
    fontWeight: '700',
  },
  trackerCard: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 20,
    padding: 14,
    gap: 10,
  },
  classRow: {
    backgroundColor: '#F4EBDD',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    flexWrap: 'wrap',
  },
  classTextGroup: {
    flex: 1,
    minWidth: 140,
    paddingRight: 10,
  },
  className: {
    fontSize: 14,
    color: theme.colors.ink,
    fontWeight: '700',
    marginBottom: 1,
  },
  professor: {
    fontSize: 11,
    color: theme.colors.soft,
  },
  classStatus: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  classStatusConfirmed: {
    backgroundColor: theme.colors.greenLight,
  },
  classStatusSent: {
    backgroundColor: theme.colors.yellowLight,
  },
  classStatusPending: {
    backgroundColor: theme.colors.redLight,
  },
  classStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  letterCard: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 20,
    padding: 16,
  },
  letterParagraph: {
    fontSize: 13,
    lineHeight: 23,
    color: theme.colors.ink,
    fontFamily: theme.fonts.display,
    marginBottom: 14,
  },
  letterAccent: {
    color: theme.colors.accent,
    fontStyle: 'italic',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
    flexWrap: 'wrap',
  },
  footerQuote: {
    alignItems: 'center',
    paddingVertical: 32,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  footerQuoteText: {
    fontFamily: theme.fonts.display,
    fontSize: Platform.OS === 'web' ? 24 : 20,
    lineHeight: 34,
    textAlign: 'center',
    color: theme.colors.ink,
    fontStyle: 'italic',
    maxWidth: 780,
  },
  footerByline: {
    marginTop: 14,
    color: theme.colors.accent,
    fontSize: 14,
    fontStyle: 'italic',
  },
})

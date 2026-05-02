// src/constants/isu.ts
import { AccommodationItem, ClassRow, RoadmapStepType } from '../types'

export const ISU = {
  name:            'Iowa State University',
  sasOfficeName:   'Student Accessibility Services (SAS)',
  sasAddress:      '1060 Hixson Lied Student Success Center, 215 Beach Rd, Ames, IA 50011',
  sasEmail:        'accessibility@iastate.edu',
  sasPhone:        '515-294-7220',
  sasBuilding:     'Hixson Lied Student Success Center',
  sasResponseDays: '5–7 business days',
  counsellingUrl:  'https://www.counseling.iastate.edu/',
  healthCenterName:'Thielen Student Health Center',
  healthCenterUrl: 'https://health.iastate.edu/',
  sasUrl:          'https://sas.dso.iastate.edu/students',
}

export const ACCOMMODATIONS: AccommodationItem[] = [
  {
    id: 'extended-time',
    icon: '⏱',
    name: 'Extended test time',
    description: 'Get 1.5× or 2× exam time so you can show what you actually know.',
    selected: false,
  },
  {
    id: 'distraction-reduced',
    icon: '🏠',
    name: 'Distraction-reduced room',
    description: 'Take exams in a quieter space at ISU\'s Exam Accommodations Center.',
    selected: false,
  },
  {
    id: 'note-taking',
    icon: '📝',
    name: 'Note-taking support',
    description: 'Access peer notes through ISU\'s Peer Notetaker Program.',
    selected: false,
  },
  {
    id: 'priority-seating',
    icon: '🪑',
    name: 'Priority seating',
    description: 'Sit at the front of the lecture hall to reduce distractions.',
    selected: false,
  },
  {
    id: 'breaks',
    icon: '🔄',
    name: 'Breaks during exams',
    description: 'Take short breaks during long exams without losing time.',
    selected: false,
  },
  {
    id: 'text-to-speech',
    icon: '🔊',
    name: 'Text-to-speech',
    description: 'Use approved software to have content read aloud to you.',
    selected: false,
  },
]

export const DEMO_CLASSES: ClassRow[] = [
  {
    id: '1',
    className: 'COMS 227 — Object-Oriented Programming',
    professorName: 'Prof. Rosie Steelman',
    professorEmail: 'rsteelman@iastate.edu',
    status: 'confirmed',
    sentAt: '2024-09-15',
    confirmedAt: '2024-09-16',
  },
  {
    id: '2',
    className: 'MATH 165 — Calculus I',
    professorName: 'Prof. James Cochran',
    professorEmail: 'jcochran@iastate.edu',
    status: 'sent',
    sentAt: '2024-09-15',
  },
  {
    id: '3',
    className: 'ENGL 150 — Critical Thinking',
    professorName: 'Prof. Tanya Ogilvie',
    professorEmail: 'togilvie@iastate.edu',
    status: 'not_sent',
  },
  {
    id: '4',
    className: 'LIB 160 — Information Literacy',
    professorName: 'Prof. Sarah Henning',
    professorEmail: 'shenning@iastate.edu',
    status: 'not_sent',
  },
]

export const ROADMAP_STEPS: RoadmapStepType[] = [
  {
    number: 1,
    title: 'Tell us what you\'re experiencing',
    description: 'You described your situation and we identified what you likely qualify for.',
    status: 'done',
    badge: 'Complete',
  },
  {
    number: 2,
    title: 'Get documentation from your doctor',
    description: 'We\'ve drafted a note for your physician — they just sign it. Most take under 10 minutes.',
    status: 'active',
    badge: 'In progress',
    link: ISU.healthCenterUrl,
  },
  {
    number: 3,
    title: 'Submit to ISU Student Accessibility Services',
    description: `Email your letter to ${ISU.sasEmail}. Response time is ${ISU.sasResponseDays}.`,
    status: 'todo',
    link: ISU.sasUrl,
  },
  {
    number: 4,
    title: 'Send letters to your professors',
    description: 'Voiced sends personalised letters to each professor and tracks who responds.',
    status: 'todo',
  },
]
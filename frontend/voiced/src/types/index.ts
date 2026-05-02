// src/types/index.ts
export type AccommodationItem = {
  id: string
  icon: string
  name: string
  description: string
  selected: boolean
}

export type AnalyzeResponse = {
  needsFollowUp: boolean
  followUpQuestion?: string
  routing?: 'accommodations' | 'counselling' | 'health-center'
  disability?: string
  accommodations?: string[]
  aiResponse: string
}

export type ClassStatus = 'not_sent' | 'sent' | 'confirmed'

export type ClassRow = {
  id: string
  className: string
  professorName: string
  professorEmail: string
  status: ClassStatus
  sentAt?: string
  confirmedAt?: string
}

export type StudentProfile = {
  id: string
  name: string
  studentId: string
  university: string
  diagnosis?: string
  accommodations?: string[]
  letterText?: string
}

export type LetterData = {
  studentName: string
  studentId: string
  university: string
  diagnosis: string
  accommodations: string[]
  doctorName?: string
}

export type RoadmapStepType = {
  number: number
  title: string
  description: string
  status: 'done' | 'active' | 'todo'
  badge?: string
  link?: string
}
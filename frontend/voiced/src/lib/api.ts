// src/lib/api.ts
import { AnalyzeResponse, LetterData } from '../types'

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001'

export async function transcribeAudio(audioUri: string): Promise<{ transcript: string }> {
  const formData = new FormData()
  formData.append('audio', {
    uri: audioUri,
    type: 'audio/m4a',
    name: 'recording.m4a',
  } as any)

  const res = await fetch(`${API_URL}/api/transcribe`, {
    method: 'POST',
    body: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  if (!res.ok) throw new Error('Transcription failed')
  return res.json()
}

export async function analyzeTranscript(transcript: string): Promise<AnalyzeResponse> {
  const res = await fetch(`${API_URL}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript }),
  })
  if (!res.ok) throw new Error('Analysis failed')
  return res.json()
}

export async function generateLetter(data: LetterData): Promise<{ letterText: string }> {
  const res = await fetch(`${API_URL}/api/generate-letter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Letter generation failed')
  return res.json()
}

export async function generateProfessorEmail(data: {
  studentName: string
  professorName: string
  className: string
  accommodations: string[]
}): Promise<{ emailSubject: string; emailBody: string }> {
  const res = await fetch(`${API_URL}/api/professor-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Email generation failed')
  return res.json()
}

export async function generateFollowUpEmail(data: {
  studentName: string
  professorName: string
  className: string
  accommodations: string[]
}): Promise<{ emailSubject: string; emailBody: string }> {
  const res = await fetch(`${API_URL}/api/followup-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Follow-up failed')
  return res.json()
}
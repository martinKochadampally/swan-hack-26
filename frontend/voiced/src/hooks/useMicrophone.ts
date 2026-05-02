// src/hooks/useMicrophone.ts
import { useState, useRef } from 'react'
import { Audio } from 'expo-av'

export function useMicrophone() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUri, setAudioUri] = useState<string | null>(null)
  const recordingRef = useRef<Audio.Recording | null>(null)

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync()
      if (status !== 'granted') {
        alert('Microphone permission is required. Please allow it in your device settings.')
        return
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      )
      recordingRef.current = recording
      setIsRecording(true)
    } catch (err) {
      console.error('Failed to start recording:', err)
    }
  }

  const stopRecording = async () => {
    if (!recordingRef.current) return
    try {
      await recordingRef.current.stopAndUnloadAsync()
      const uri = recordingRef.current.getURI()
      setAudioUri(uri)
      recordingRef.current = null
      setIsRecording(false)

      await Audio.setAudioModeAsync({ allowsRecordingIOS: false })
    } catch (err) {
      console.error('Failed to stop recording:', err)
    }
  }

  const toggleRecording = () => {
    if (isRecording) stopRecording()
    else startRecording()
  }

  return { isRecording, audioUri, toggleRecording }
}
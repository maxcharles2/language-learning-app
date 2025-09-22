export function getEncouragingMessage(isCorrect: boolean, streak: number): string {
  if (isCorrect) {
    if (streak >= 5) {
      return "🔥 Amazing streak! You're on fire!"
    } else if (streak >= 3) {
      return "🎉 Great job! Keep it up!"
    } else {
      const correctMessages = [
        "✅ Correct! Well done!",
        "🎯 Perfect! You got it!",
        "👏 Excellent work!",
        "⭐ That's right! Great job!",
        "🌟 Fantastic! Keep going!",
      ]
      return correctMessages[Math.floor(Math.random() * correctMessages.length)]
    }
  } else {
    const incorrectMessages = [
      "💪 Don't worry, keep trying!",
      "📚 Learning opportunity! Try again!",
      "🎯 Close! You'll get the next one!",
      "💡 No problem, that's how we learn!",
      "🌱 Every mistake helps you grow!",
    ]
    return incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)]
  }
}

export function playFeedbackSound(isCorrect: boolean): void {
  // Only play sounds if audio is supported and user hasn't disabled it
  if (typeof window !== "undefined" && "AudioContext" in window) {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      if (isCorrect) {
        // Play success sound (higher pitched, pleasant)
        playTone(audioContext, 800, 0.1, "sine")
        setTimeout(() => playTone(audioContext, 1000, 0.1, "sine"), 100)
      } else {
        // Play error sound (lower pitched, gentle)
        playTone(audioContext, 300, 0.2, "sine")
      }
    } catch (error) {
      // Silently fail if audio context creation fails
      console.debug("Audio feedback not available:", error)
    }
  }
}

function playTone(audioContext: AudioContext, frequency: number, duration: number, type: OscillatorType): void {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.value = frequency
  oscillator.type = type

  gainNode.gain.setValueAtTime(0, audioContext.currentTime)
  gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01)
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration)
}

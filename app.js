import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://znuegshdnkwwysyevohd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpudWVnc2hkbmt3d3lzeWV2b2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MDIwOTUsImV4cCI6MjA2NDk3ODA5NX0.tChMtrpMnE_1oXDjYO-KKhBZDL8lIXdzci7NGrD_kpw'
const supabase = createClient(supabaseUrl, supabaseKey)

const select = document.getElementById('wordSelect')
const translationDiv = document.getElementById('translation')
const speakBtn = document.getElementById('speakBtn')

let currentSlovakWord = ''

select.addEventListener('change', async () => {
  const enWord = select.value
  translationDiv.textContent = ''
  speakBtn.disabled = true

  if (!enWord) return

  const { data, error } = await supabase
    .from('vocab')
    .select('sk_word')
    .eq('en_word', enWord)
  console.log(data)

  if (error || !data) {
    translationDiv.textContent = 'Translation not found.'
    return
  }

  currentSlovakWord = data.sk_word
  translationDiv.textContent = `Slovak: ${currentSlovakWord}`
  speakBtn.disabled = false
})

speakBtn.addEventListener('click', () => {
  const utterance = new SpeechSynthesisUtterance(currentSlovakWord)
  utterance.lang = 'sk-SK'
  speechSynthesis.speak(utterance)
})

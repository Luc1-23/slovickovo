import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://znuegshdnkwwysyevohd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpudWVnc2hkbmt3d3lzeWV2b2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MDIwOTUsImV4cCI6MjA2NDk3ODA5NX0.tChMtrpMnE_1oXDjYO-KKhBZDL8lIXdzci7NGrD_kpw'
const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    headers: {
      'Accept': 'application/json'
    }
  }
})


document.addEventListener('DOMContentLoaded', () => {
const select = document.getElementById('wordSelect')
const translationDiv = document.getElementById('translation')
const speakBtn = document.getElementById('speakBtn')

let currentSlovakWord = ''

select.addEventListener('change', async () => {
  const enWord = select.value
  translationDiv.textContent = ''
  speakBtn.disabled = true

  if (!enWord) return;



const { data, error } = await supabase
    .from('vocab')
    .select('sk_word')
    .eq('en_word', enWord)

  console.log('Raw data result:', data)
  console.log('Error (if any):', error)

  if (error || !data) {
    translationDiv.textContent = 'Translation not found.'
    return
  }

  if (data && data.length > 0) {
  const translation = data[0].sk_word;
  currentSlovakWord = translation;
  console.log('Translation:', translation);
  document.getElementById("translation").textContent = `Slovak: ${translation}`;
  speakBtn.disabled = false
} else {
  document.getElementById("translation").textContent = "Slovak: not found";
}

})

speakBtn.addEventListener('click', () => {
  if (!currentSlovakWord) return; // guard clause
  const utterance = new SpeechSynthesisUtterance(currentSlovakWord)
  utterance.lang = 'sk-SK'
  speechSynthesis.speak(utterance)
})
})

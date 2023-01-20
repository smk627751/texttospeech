let input = document.getElementById('input')
input.onkeyup = e => {
    input.style.height = "50px"
    let h = e.target.scrollHeight
    input.style.height = `${h/2}px`
    // input.style.width = `${(h*16/9)*2}px`
}
let speak = document.getElementById('speak')

let stop = document.getElementById('stop')
stop.setAttribute('disabled','true')

const u = new SpeechSynthesisUtterance()
u.onend = () => stop.click()

speak.onclick = (e) => 
{
    if(input.value == '')
    {
        alert('Field is required')
        return;
    }
    e.preventDefault();
    u.text = input.value
    speechSynthesis.speak(u)
    speak.setAttribute('disabled','true')
    stop.removeAttribute('disabled')
}

stop.onclick = (e) => {
    e.preventDefault()
    speechSynthesis.cancel()
    speak.removeAttribute('disabled')
    mic.removeAttribute('disabled')
    stop.setAttribute('disabled','true')
    rec.stop()
}

let rec = new webkitSpeechRecognition()
rec.continuous = true
rec.lang = "en-US"
rec.interimResults = false
rec.maxAlternatives = 1

let mic = document.getElementById('mic')
mic.onclick = (e) => {
    e.preventDefault()
    rec.start()
    speak.setAttribute('disabled','true')
    stop.removeAttribute('disabled')
    mic.setAttribute('disabled','true')
}

rec.onresult = e => {
    res = e.results[e.results.length-1][0].transcript
    console.log(res)
    input.value += res + ','
    // rec.stop()
}
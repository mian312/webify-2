const text = document.getElementById('show')
const btn = document.getElementById("btn")
const words = document.getElementById("write")
const time = document.getElementById("timer")
const error = document.getElementById("error")
let startTime, endTime, totalTime;

let correct = true

const getNewQuote = async () =>
{
    var url="https://api.quotable.io/random";    

    const response = await fetch(url);
    const allQuotes = await response.json();
    const quote = allQuotes.content //[indx]
    
    quote.innerHTML = ''
    Array = quote.split('')
    Array.forEach(element => {
        const Span = document.createElement('span')
        Span.innerText = element
        text.appendChild(Span)
    });

    words.addEventListener('input', () => {
        const Quote = text.querySelectorAll('span')
        const Value = words.value.split('')
    let cnt = 0
        Quote.forEach((characters, i) => {
            const character = Value[i]
            if (character == null) {
                characters.classList.remove('correct')
                characters.classList.remove('incorrect')
            }
            else if (character === characters.innerText) {
                characters.classList.add('correct')
                characters.classList.remove('incorrect')
            }
            else{
                characters.classList.add('incorrect')
                characters.classList.remove('correct')
                cnt++
            }
        });
        const E = document.createElement('p')
        E.innerText = cnt
        if (cnt == 1) {
            alert("You have only one error. Fix this now")
        }
    })
    
}
function getWordCount(text) {
            return text.split(' ')
              .filter(function(n) { return n != '' })
              .length;
       }

const endplay = async () => {
    // btn.innerText = "Next Line"
    let date = new Date()
    window.endTime = date.getTime()
    let totalTime = (Math.round((window.endTime - window.startTime)/1000))
    console.log(totalTime)
    console.log(getWordCount(text.innerText))
    let wpm =Math.round((getWordCount(text.innerText)/totalTime)*60)
    console.log(wpm)
    alert("Your word per minute limit is: "+ wpm)
}
const playGame = () => {
    let date = new Date()
    window.startTime = date.getTime()
    btn.innerText = "End"
}

btn.addEventListener('click',function(){
    if(this.innerText == 'Start'){
        playGame()
        
    }
    else if(this.innerText == "End"){
        endplay()
        location.reload()
    }
})



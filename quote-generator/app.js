const QuoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

const API_URL =
  'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
const proxyURL = 'https://cors-anywhere.herokuapp.com/' //This is a horuko Proxy

// Show Loading
const loading = () => {
  loader.hidden = false
  QuoteContainer.hidden = true
}

// Complete Loading animation
const complete = () => {
  if (!loader.hidden) {
    loader.hidden = true
    QuoteContainer.hidden = false
  }
}

// getQuote Function
const getQuote = async () => {
  loading()
  try {
    const res = await fetch(proxyURL + API_URL)
    const data = await res.json()

    // Author Name
    if (data.quoteAuthor === '') {
      authorText.innerText = 'UnKnown'
    }
    authorText.innerText = data.quoteAuthor

    // Quote FontSize Length adusting
    if (data.quoteText.length > 50) {
      quoteText.classList.add('long-quote')
    } else {
      quoteText.classList.remove('long-quote')
    }
    quoteText.innerText = data.quoteText
    complete()
  } catch (error) {
    getQuote()
    console.log('Wopps no Quote ' + error)
  }
}

// TweetQuote

const tweetQuote = () => {
  const quote = quoteText.innerText
  const author = authorText.innerText
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`

  window.open(twitterUrl, '_blank')
}

// EventListner
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

// OnLoad

getQuote()

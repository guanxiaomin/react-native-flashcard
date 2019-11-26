import { AsyncStorage } from 'react-native'
export const FLASHCARD_STORAGE_KEY = 'Flashcards:decks'

const decks = {
  "44ggml6gtyfphi2jemunos": {
    id: '44ggml6gtyfphi2jemunos',
    title: 'Udacicards',
    cards: [
      {
        question: 'Does React Native work with Android?',
        answer: 'Yes!'
      },
      {
        question: 'What is a component?',
        answer: 'Component is a bla bla bla bla',
      },
    ],
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    title: 'React',
    cards: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    title: 'JavaScript',
    cards: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

function setDummyData() {
  AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks))
  return decks
}

export function formatDeckResults (results) {
  setDummyData()
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}
import { AsyncStorage } from 'react-native'
import { FLASHCARD_STORAGE_KEY, formatDeckResults } from './_DATA'

export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function fetchDeckResults () {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(formatDeckResults)
}

export function submitDeck ({ id, deck }) {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [id]: deck
  }))
}

export function removeDeck (id) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[id] = undefined
      delete data[id]
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
    })
}

export function submitCard({ deckId, card }) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results);
      data[deckId].cards.push(card);
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
    })
    .catch(error => console.error)
}
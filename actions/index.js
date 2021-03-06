export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'CREATE_DECK'
export const RECEIVE_CARDS = 'RECEIVE_CARDS'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function receiveCards (cards) {
  return {
    type: RECEIVE_CARDS,
    cards,
  }
}

export function addCard (card, deckId) {
  return {
    type: ADD_CARD,
    card,
    deckId
  }
}
import { combineReducers } from 'redux'
import { RECEIVE_DECKS, ADD_DECK, RECEIVE_CARDS, ADD_CARD } from '../actions'
export default function decks ( state = {}, action ) {
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      }
    case ADD_CARD:
      const {deckId, card } = action
      const updated = state[deckId]
      updated.cards.push(card)
      return {
        ...state,
        [deckId]: updated,
      }
    default:
      return state
  }
}
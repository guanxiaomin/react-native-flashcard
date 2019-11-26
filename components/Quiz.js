import React, { Component } from 'react'
import { Button, View, Text, TextInput, TouchableOpacity, StyleSheet, ProgressViewIOS } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { white } from '../utils/colors'

function TestResults({totalCorrect, total, handleRestart, handleGoBack}) {
  return (
    <View style={styles.container}>
      <Text>YOUR SCORE {Math.floor((totalCorrect / total) * 100) + '%'}</Text>
      <Text>You missed {total - totalCorrect} out of {total} questions</Text>
      <View styles={{alignSelf:'center',}}>
        <TextButton onPress={handleRestart}>
          Restart Quiz
        </TextButton>
        <TextButton onPress={handleGoBack}>
          Back to Deck
        </TextButton>
      </View>
    </View>
  )
}
class Quiz extends Component {
  state = {
    totalCorrect: 0,
    currentIndex: 0,
    showAnswer: false,
  }

  toggleAnswer = () => {
    const current = this.state.showAnswer
    this.setState({showAnswer: !current})
  }

  submitCorrect = () => {
    this.setState(prevState => ({
      totalCorrect: prevState.totalCorrect + 1,
      currentIndex: prevState.currentIndex + 1,
      showAnswer: false,
    }))
  }

  submitIncorrect = () => {
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      showAnswer: false,
    }))
  }

  handleRestart = () => {
    this.setState({
      totalCorrect: 0,
      currentIndex: 0,
      showAnswer: false,
    })
  }

  handleGoBack = () => {
    const { navigation } = this.props
    const deckId = navigation.state.params.deckId
    navigation.navigate("DeckDetail", {deckId: deckId})
  }
  render() {
    const { deckTitle, cards } = this.props
    // console.log(cards)
    // console.log(this.props.navigation.state.params.deckId)
    const { totalCorrect, currentIndex, showAnswer } = this.state
    if (currentIndex === cards.length) {
      return (
        <TestResults
          totalCorrect={totalCorrect}
          total={cards.length}
          handleRestart={this.handleRestart}
          handleGoBack={this.handleGoBack}
        />
      )
    }
    else {
      const currentCard = cards[currentIndex]
      return (
        <View style={styles.container}>
          <View style={styles.progress}>
            <ProgressViewIOS progress={(currentIndex + 1) / cards.length}/>
            <Text style={{alignSelf: 'flex-start'}}>{currentIndex + 1} / {cards.length}</Text>
          </View>

          <Text style={styles.title}>{showAnswer ? currentCard.answer : currentCard.question}</Text>
          <Button title={showAnswer ? "Back To Question" : "Reveal Answer"} onPress={this.toggleAnswer} />

          <View styles={{alignSelf:'center',}}>
            <TextButton
              style={{backgroundColor: '#0f0'}}
              onPress={this.submitCorrect}
            >
              Correct
            </TextButton>
            <TextButton
            style={{backgroundColor: '#f00'}}
             onPress={this.submitIncorrect}
            >
              Incorrect
            </TextButton>
          </View>
        </View>
      )
    }
  }
}

function mapStateToProps(decks, passedProps) {
  const deckId = passedProps.navigation.state.params.deckId
  const deck = decks[deckId]
  return {
    deckTitle: deck.title,
    cards: deck.cards,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: white,
  },
  progress: {
    // flex: 1,

    alignSelf: 'stretch',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
})

export default connect(mapStateToProps)(Quiz)
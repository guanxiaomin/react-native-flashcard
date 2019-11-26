import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { addCard } from '../actions'
import { submitCard } from '../utils/api'
import { connect } from 'react-redux'
import { gray } from '../utils/colors'
import TextButton from './TextButton'

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  submit = () => {
    const { question, answer } = this.state
    const filteredQuestion = question.trim()
    const filteredAnswer = answer.trim()
    if (filteredQuestion === '' || filteredAnswer === '') {
      alert("Empty Question or Answer!")
      return
    }
    const card = {
      question: filteredQuestion,
      answer: filteredAnswer,
    }
    const deckId = this.props.navigation.state.params.deckId
    this.props.dispatch(addCard(card, deckId))
    console.log(this.props.decks[deckId])
    this.setState({
      question: '',
      answer: '',
    })
    this.props.navigation.navigate('DeckDetail', {deckId: deckId})
    submitCard({card, deckId})
  }
  render() {
    const { question, answer } = this.state
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Question'
          onChangeText={text => this.setState({question: text})}
          value={question}
        />
        <TextInput
          style={styles.input}
          placeholder='Answer'
          onChangeText={text => this.setState({answer: text})}
          value={answer}
        />
        <TextButton onPress={this.submit}>Submit Card</TextButton>
      </KeyboardAvoidingView>
    )
  }
}
function mapStateToProps(decks) {
  return {
    decks,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'space-evenly',
    alignItems:'center',
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  input: {
    width: 350,
    fontSize: 16,
    height: 40,
    padding: 10,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: gray,
    margin: 5
  },
})

export default connect(mapStateToProps)(NewCard)
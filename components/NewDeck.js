import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { generateUID, submitDeck } from '../utils/api'
import { addDeck } from '../actions'
import TextButton from './TextButton'

class DeckList extends Component {
  state = {
    title: '',
  }

  submit = () => {
    const id = generateUID();
    const deck = {
      id,
      title: this.state.title === '' ? "New Deck" : this.state.title,
      cards: [],
    }
    this.props.dispatch(addDeck({
      [id]: deck,
    }))
    this.setState({
      title: '',
    })
    this.props.navigation.navigate('DeckDetail', {deckId: id})
    // save to DB
    submitDeck(id, deck)
  }

  onChange = ({ text }) => {
    this.setState({
      title: text,
    })
  }

  render() {
    const { title } = this.state

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          placeholder='Deck Title'
          onChangeText={text => this.onChange({text})}
          value={title}
        />
        <TextButton style={styles.submitBtn} onPress={this.submit}>
          Create New Deck
        </TextButton>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-evenly',
    alignItems:'center',
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  input: {
    width: 350,
    fontSize: 20,
    height: 50,
    padding: 10,
    borderRadius: 1,
    borderWidth: 1,
    // borderColor: '#000',
    margin: 20
  },
})

export default connect()(DeckList)
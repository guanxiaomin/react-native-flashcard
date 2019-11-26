import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import TextButton from './TextButton'

class DeckDetail extends Component {
  state = {
    showHint: false,
  }

  render() {
    const { deck, navigation } = this.props
    // console.log(this.props.navigation.state.params.deckId)
    const { id, title, cards } = deck
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{cards.length} cards</Text>
        </View>
        <Text style={styles.hint}>{this.state.showHint && `Empty deck. Add card first!`}</Text>
        <View style={styles.buttons}>
          <TextButton onPress={() => {
            this.setState({showHint: false})
            navigation.navigate('NewCard', {deckId: id})}
          }>
            Add Card
          </TextButton>
          <TextButton onPress={() => {
            if (cards.length === 0) {
              this.setState({showHint: true})
              return
            }
            navigation.navigate('Quiz', {deckId: id})}
          }>
            Start Quiz
          </TextButton>
        </View>
      </View>
    )
  }
}

function mapStateToProps( decks, passedProps ) {
  const deckId = passedProps.navigation.state.params.deckId
  return {
    deck: decks[deckId],
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: white,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    textAlign: "center",
    color: '#97a5aa',
    marginTop: 10,
  },
  hint: {
    textAlign: "center",
    color: '#f00',
    marginTop: 10,
  },
  buttons: {
    alignItems:'center',
    marginTop: 50,
  }
})

export default connect(mapStateToProps)(DeckDetail)
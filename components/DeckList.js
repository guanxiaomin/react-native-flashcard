import React, { Component } from 'react'
import { Button, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchDeckResults } from '../utils/api'
import { receiveDecks } from '../actions'
import { white, gray, blue } from '../utils/colors'
import { AppLoading } from 'expo'

function DeckSnippet({ id, title, cardCount, navigation }) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate("DeckDetail", {deckId: id})
      }}
      >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{cardCount} cards</Text>
    </TouchableOpacity>
  )
}

class DeckList extends Component {
  state = {
    ready: false,
  }
  componentDidMount () {
    const { dispatch } = this.props
    fetchDeckResults()
      .then((result) => dispatch(receiveDecks(result)))
      .then(() => this.setState({
        ready: true,
      }))
  }

  handleInit = () => {
    this.props.navigation.navigate("NewDeck")
  }
  render() {
    if (!this.state.ready) {
      return (
        <AppLoading />
      )
    }
    const { decks } = this.props
    // console.log(decks)
    if (!decks || Object.keys(decks).length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Flashcard</Text>
          <Button title="Create your first deck" onPress={this.handleInit} />
        </View>
      )
    }
    return (
      <View>
        <FlatList
          data={Object.values(decks)}
          renderItem={({item}) => (
            <DeckSnippet
              id={item.id}
              title={item.title}
              cardCount={item.cards.length}
              navigation={this.props.navigation}
            />)}
          keyExtractor={item => item.id}
        />
      </View>
    );
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
    backgroundColor: white,
    justifyContent: "center",
    textAlign: 'center'
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: white,
    minHeight: 150,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
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
  }
})

export default connect(mapStateToProps)(DeckList)
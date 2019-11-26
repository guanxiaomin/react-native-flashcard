import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Constants from 'expo-constants'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { blue, white } from './utils/colors'
import DeckDetail from './components/DeckDetail'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers'

function FlashStatusBar ({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const IOSTabs = createBottomTabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add New Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor} />
    }
  }
},
{
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: blue,
    style: {
      height: 60,
      backgroundColor: white,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
    labelStyle: {
      paddingTop: 3,
      fontSize: 14,
      fontWeight: "bold"
    }
  }
}
)

const RootStack = createStackNavigator(
  {
    Home: IOSTabs,
    DeckDetail: DeckDetail,
    NewCard: NewCard,
    Quiz: Quiz,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerTintColor: white,
      headerStyle: { backgroundColor: blue },
      headerTitleStyle: { fontWeight: "bold" }
    }
  },

)

const MainNavigator = createAppContainer(RootStack)

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <FlashStatusBar backgroundColor={blue} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
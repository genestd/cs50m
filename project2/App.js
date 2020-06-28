import 'react-native-gesture-handler';
import React, { createContext, useReducer } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import SearchScreen from './screens/SearchScreen'
import ResultsScreen from './screens/ResultsScreen'
import INITIAL_STATE from './store/initialState'
import reducer from './store/reducer'
import { Provider } from './store/context'
import DetailScreen from './screens/DetailScreen';

const MainNavigator = createStackNavigator({
  Search: SearchScreen,
  Results: ResultsScreen,
  Details: DetailScreen
})
const Nav = createAppContainer(MainNavigator)

export default () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <Provider value={{state, dispatch}}>
      <Nav />
    </Provider>
  )
}

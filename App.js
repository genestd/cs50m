import React, { useState } from 'react';
import { useFonts } from '@use-expo/font';
import { useMachine } from '@xstate/react'
import { StyleSheet, View, Text } from 'react-native';
import { AppLoading } from 'expo'
import Constants from 'expo-constants'
import Clock from './src/Clock'
import Controls from './src/Controls'
import { pomodoroMachine, WORK } from './utils/stateMachine'

const App = () => {
  const [state, send, service] = useMachine(pomodoroMachine)

  return (
    <View style={{
      flex: 1,
      backgroundColor: state.context.background,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight
    }}>
      <Clock
        time={state ? state.context.timeRemaining : 1500}
        styles={styles.clock} />
      <View>
        <Controls
          onButtonPress={send}
          color={state.context.background}
        />
      </View>
      <Text style={styles.footer}>{state.context.timeType === WORK ? 'Work it' : 'Chill'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(225, 95%, 45%)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight
  },
  clock: {
    fontFamily: 'Menlo-Regular',
    color: '#fff',
    fontSize: 104,
  },
  footer: {
    fontFamily: 'Menlo-Regular',
    fontSize: 32,
    color: '#fff',
    position: 'absolute',
    bottom: 0,
    margin: 10
  }
});

export default App
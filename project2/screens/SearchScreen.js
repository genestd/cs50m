import React, { useContext, useState } from 'react'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import { movieContext } from '../store/context'
import * as actions from '../store/actionTypes'
import { doSearch } from '../services/search-service'

export default ({navigation}) => {
    const [message, setMessage] = useState('')
    const {state, dispatch} = useContext(movieContext)

    const executeSearch = async () => {
        try {
            setMessage('')
            dispatch({ type: actions.SET_LOADING, loading: true})
            const results = await doSearch(state.searchInput)
            if (results.Response !== 'False') {
                dispatch({ type: actions.SET_RESULTS, results})
                navigation.navigate('Results')
            } else {
                setMessage('No results found. Try again.')
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch({ type: actions.SET_LOADING, loading: false})
        }
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Enter a phrase to search the Open Movie Database</Text>
                <TextInput style={styles.input} value={state.searchInput} onChangeText={(value) => dispatch({ type: actions.SET_SEARCH, value})} />
                <Text>{message}</Text>
                <Button onPress={executeSearch} title='Search' disabled={state.searchInput.length < 3} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 40
    },
    title: {
        padding: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        width: 200
    }
  });
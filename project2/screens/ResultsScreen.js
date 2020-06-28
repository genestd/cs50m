import React, { useContext } from 'react'
import { ScrollView, Text, StyleSheet, Button } from 'react-native'
import { movieContext } from '../store/context'
import * as actions from '../store/actionTypes'
import Movie from '../components/Movie'
import { doSearch } from '../services/search-service'

export default ({navigation}) => {
    const {state, dispatch} = useContext(movieContext)
    const showDetails = (id) => {
        dispatch({ type: actions.SELECT_MOVIE, id})
        navigation.navigate('Details')
    }
    const addResults = async () => {
        try {
            dispatch({ type: actions.SET_LOADING, loading: true})
            const results = await doSearch(state.searchInput, state.page + 1)
            dispatch({ type: actions.ADD_RESULTS, page: state.page + 1, results})
        } catch (error) {
            console.log(error)
        } finally {
            dispatch({ type: actions.SET_LOADING, loading: false})
        }
    }
    return (
        state.loading ? <Text>Loading</Text> : (
            <>
                <Text>You searched for '{state.searchInput}'. Displaying 1 - {state.results.Search.length} of {state.results.totalResults}</Text>
                <ScrollView style={styles.container}>
                    {state.results.Search && state.results.Search.map(movie => <Movie key={movie.imdbID} data={movie} handlePress={showDetails} />)}
                </ScrollView>
                {state.results.Search.length < state.results.totalResults && <Button title='Get More' onPress={addResults} />}
            </>
        )
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        textAlign: 'center'
    }
})
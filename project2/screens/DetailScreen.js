import React, { useContext, useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { movieContext } from '../store/context'
import { doSearchById } from '../services/search-service'

export default () => {
    const { state, dispatch } = useContext(movieContext)
    const [details, setDetails] = useState()
    useEffect(() => {
        async function getDetails(id) {
            const dtls = await doSearchById(id)
            setDetails(dtls)
        }
        if (state.selectedMovie) {
            getDetails(state.selectedMovie.imdbID)
        }
    }, [state.selectedMovie])
    console.log(state.selectedMovie, details)
    return (
        details ? (
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: details.Poster }} />
                <Text style={styles.title}>{details.Title}</Text>
                <Text>{details.Rated} {details.Runtime}</Text>
                <Text>{details.Plot}</Text>
            </View>
        ) : null
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight
    },
    image: {
        height: 100,
        width: 100
    },
    title: {
        fontSize: 28
    }
})
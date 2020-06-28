import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default ({data, handlePress}) => {
    return (
        <View style={styles.outerContainer}>
            <TouchableOpacity style={styles.container} onPress={() => handlePress(data.imdbID)}>
                <Text style={styles.year}>{data.Year}</Text>
                <Text style={styles.title}>{data.Title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        display: 'flex',
        overflow: 'scroll'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    year: {
        fontWeight: 'bold',
        padding: 10
    },
    title: {
        padding: 10
    }
})
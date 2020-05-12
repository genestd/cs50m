import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

const Controls = ({ color, onButtonPress }) => {
    return (
        <View style={styles.container}>
            <Icon
                type='ionicon'
                name='ios-play'
                raised
                color={color}
                underlayColor='#fff'
                onPress={() => onButtonPress('START')}
                />
            <Icon
                type='ionicon'
                name='ios-pause'
                raised
                color={color}
                underlayColor='#fff'
                onPress={() => onButtonPress('PAUSE')} 
                />
            <Icon
                type='ionicon'
                name='ios-refresh'
                raised
                color={color}
                underlayColor='#fff'
                onPress={() => onButtonPress('REFRESH')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})

export default Controls
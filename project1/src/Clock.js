import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

const Clock = props => {
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes}:${seconds < 10 ? '0'+seconds : seconds}`
    }

    return  <Text style={props.styles}>{formatTime(props.time)}</Text>
}

Clock.propTypes = {
    styles: PropTypes.object.isRequired,
    time: PropTypes.number.isRequired
}

Clock.defaultProps = {
    styles: {},
    time: 1500
}

export default Clock
import React from 'react'
import { ActivityIndicator, Dimensions, View } from 'react-native'

const Loading = () => {
    return (
        <View
            style={{
                height : Dimensions.get('window').height,
                width : Dimensions.get('window').width,
                justifyContent : 'center',
                alignItems : 'center',
                position : 'absolute',
                top : 0,
            }}
        >
            <ActivityIndicator size="large" color="#00ff00"/>
        </View>
    )
}

export default Loading

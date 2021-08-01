import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Game from '../../Components/Game/Game'

const Play = () => {
    // console.log(Dimensions.get('window').width)
    const dispatch = useDispatch();
    const color = useSelector(state=>state.game.color);
    return (
        <View>
            {/* <Text>{color}</Text> */}
            <Game/>
            {/* <Text>hello</Text> */}
        </View>
    )
}

export default Play

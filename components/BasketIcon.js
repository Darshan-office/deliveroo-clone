import { View, Text } from 'react-native'
import React from 'react'
import { useSelector, } from 'react-redux/es/hooks/useSelector'
import { selectBacketItems } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'

const BasketIcon = () => {
    const navigation = useNavigation();
    const items = useSelector(selectBacketItems)
    return (
        <View>
            <Text>BasketIcon</Text>
        </View>
    )
}

export default BasketIcon
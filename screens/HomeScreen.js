import { SafeAreaView, Text, StatusBar, StyleSheet, View, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserIcon, ChevronDownIcon, SearchIcon, AdjustmentsIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from "../sanity"

const HomeScreen = () => {
    const navigation = useNavigation()
    const [featuredCategory, setFeaturedCategory] = useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    })

    useEffect(() => {
        sanityClient.fetch(`*[_type =="featured"]{
  ...,
  restaurants[]->{
    ...,
    dishes[]->
  }
}`).then((data) => {
            setFeaturedCategory(data)
        })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View className={'flex-row pb-3 items-center mx-4 space-x-2'}>
                <Image source={{ uri: 'https://links.papareact.com/wru' }} className={"h-7 w-7 bg-gray-300 rounded-full"} />
                <View className={'flex-1'}>
                    <Text className={'font-bold text-gray-400 text-xs'}>
                        Deliver Now!
                    </Text>
                    <Text className={'font-bold text-xl'}>
                        Current Location
                        <ChevronDownIcon size={20} color={'#00CCBB'} />
                    </Text>
                </View>
                <UserIcon size={35} color='#00CCBB' />
            </View>
            <View className={'flex-row items-center space-x-2 pb-2 mx-4'}>
                <View className={'flex-row space-x-2 flex-1 bg-gray-200 p-3'}>
                    <SearchIcon size={25} color='gray' />
                    <TextInput placeholder='Restaurants and cuisines' keyboardType='default' />
                </View>
                <AdjustmentsIcon color={'#00CCBB'} />
            </View>

            {/* Body */}

            <ScrollView className={'bg-gray-100'}>
                {/* Catagories */}
                <Categories />
                {featuredCategory.map((category) => (
                    <FeaturedRow key={category._id} id={category._id} title={category.name} description={category.short_description} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: 'white',
        paddingTop: 10,
    }
})
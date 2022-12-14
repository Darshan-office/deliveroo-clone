import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import CategoryCard from './CategoryCard'
import sanityClient, { urlFor } from '../sanity'

const Categories = () => {
    const [catagories, setCategories] = useState([])
    useEffect(
        () => {
            sanityClient.fetch(`*[_type =="category"]`).then((data) => {
                setCategories(data)
            })
        }, []
    )
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}>
            {catagories.map((category) => (
                <CategoryCard key={category._id} imgUrl={urlFor(category.image).url()} title={category.name} />
            ))}
        </ScrollView>
    )
}

export default Categories
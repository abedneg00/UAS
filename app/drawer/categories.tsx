import React, { useEffect, useState } from 'react';  
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';  
import { useNavigation } from '@react-navigation/native';  
  
interface Category {  
    id: number;  
    name: string;  
}  
  
const Categories = () => {  
    const [data, setData] = useState<Category[]>([]);  
    const navigation = useNavigation();  
  
    const fetchData = async () => {  
        try {  
            const response = await fetch('https://ubaya.xyz/react/160421142/uas/category.php');  
            const resjson = await response.json();  
            setData(resjson.categories);  
        } catch (error) {  
            console.log(error);  
        }  
    };  
  
    useEffect(() => {  
        fetchData();  
    }, []);  
  
    const renderCategoryItem = ({ item }: { item: Category }) => (  
        <TouchableOpacity  
            style={styles.categoryItem}  
            onPress={() => navigation.navigate('ComicList', { categoryId: item.id })}  
        >  
            <Text style={styles.categoryText}>{item.name}</Text>  
        </TouchableOpacity>  
    );  
  
    return (  
        <View style={styles.container}>  
            <Text style={styles.header}>Category Comic</Text>  
            {data.length > 0 ? (  
                <FlatList  
                    data={data}  
                    keyExtractor={(item) => item.id.toString()}  
                    renderItem={renderCategoryItem}  
                    contentContainerStyle={styles.listContainer}  
                />  
            ) : (  
                <Text style={styles.noDataText}>No categories available.</Text>  
            )}  
        </View>  
    );  
};  
  
const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        backgroundColor: '#f5f5f5', // Light background color  
        padding: 20,  
    },  
    header: {  
        fontSize: 24,  
        fontWeight: 'bold',  
        marginBottom: 20,  
        textAlign: 'center',  
    },  
    listContainer: {  
        paddingBottom: 20,  
    },  
    categoryItem: {  
        backgroundColor: '#fff', // White background for each category item  
        padding: 15,  
        borderRadius: 10,  
        marginBottom: 10,  
        shadowColor: '#000',  
        shadowOffset: {  
            width: 0,  
            height: 2,  
        },  
        shadowOpacity: 0.1,  
        shadowRadius: 2,  
        elevation: 2, // For Android shadow  
    },  
    categoryText: {  
        fontSize: 18,  
        fontWeight: '600',  
    },  
    noDataText: {  
        textAlign: 'center',  
        fontSize: 16,  
        color: '#666',  
    },  
});  
  
export default Categories;  

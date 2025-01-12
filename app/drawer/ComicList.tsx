import React, { useEffect, useState } from 'react';      
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';      
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';      
  
// Define the type for your route parameters            
type RootStackParamList = {        
    ComicList: { categoryId: number };        
    ReadComic: { comicId: number }; // Define the expected parameters for ReadComic            
    UpdateComic: { comicId: number }; // Define the expected parameters for UpdateComic            
};        
  
// Define the type for a comic            
type Comic = {        
    comic_id: number; // Assuming comic_id is a number            
    title: string; // Assuming title is a string            
    cover_image: string; // URL for the comic's cover image            
    average_rating: number; // Assuming average_rating is a number            
};        
  
const ComicList = () => {        
    const [comics, setComics] = useState<Comic[]>([]); // Specify the type for the comics state            
    const [loading, setLoading] = useState(true);        
    const [error, setError] = useState<string | null>(null); // State for error messages          
  
    // Use the useRoute hook and define the type for the route            
    const route = useRoute<RouteProp<RootStackParamList, 'ComicList'>>(); // Specify the type for the route            
    const { categoryId } = route.params; // Now TypeScript knows categoryId exists            
  
    // Use the useNavigation hook to get the navigation object            
    const navigation = useNavigation();        
  
    useEffect(() => {        
        const fetchComics = async () => {        
            if (categoryId) {        
                try {        
                    setLoading(true);        
                    const response = await fetch(`https://ubaya.xyz/react/160421142/uas/comiclist.php?category_id=${categoryId}`);        
                    const resjson = await response.json();        
  
                    if (resjson.result === "success") {        
                        setComics(resjson.data);        
                    } else {        
                        setError(resjson.message); // Set error message          
                    }        
                } catch (error) {        
                    setError("Failed to fetch comics."); // Set generic error message          
                } finally {        
                    setLoading(false);        
                }        
            }        
        };        
  
        fetchComics();        
    }, [categoryId]);        
  
    if (loading) {        
        return (        
            <View style={styles.centered}>        
                <ActivityIndicator size="large" color="#0000ff" />        
            </View> // Show loading indicator while fetching            
        );        
    }        
  
    if (error) {        
        return (        
            <View style={styles.centered}>        
                <Text style={styles.errorText}>{error}</Text>        
            </View>        
        ); // Show error message if there's an error          
    }        
  
    if (comics.length === 0) {        
        return (        
            <View style={styles.centered}>        
                <Text>No comics found.</Text>        
            </View>        
        ); // Show message if no comics are found          
    }        
  
    const handleComicPress = (comicId: number) => {        
        navigation.navigate('readcomic', { comicId }); // Ensure the route name matches            
    };        
  
    const handleUpdatePress = (comicId: number) => {      
        console.log("Navigating to UpdateComic with ID:", comicId);      
        navigation.navigate('updatecomic', { comicId }); // Navigate to UpdateComic      
    };      
  
    return (        
        <View style={styles.container}>        
            <FlatList        
                data={comics}        
                keyExtractor={(item) => item.comic_id.toString()}        
                renderItem={({ item }) => (        
                    <TouchableOpacity onPress={() => handleComicPress(item.comic_id)}>        
                        <View style={styles.comicItem}>        
                            <Image        
                                source={{ uri: item.cover_image }}        
                                style={styles.coverImage}        
                            />        
                            <View style={styles.comicDetails}>        
                                <Text style={styles.title}>{item.title}</Text>        
                                <Text style={styles.rating}>        
                                    Rating: {item.average_rating ? item.average_rating.toFixed(1) : 'N/A'}        
                                </Text>        
                                <Button title="Update" onPress={() => handleUpdatePress(item.comic_id)} /> {/* Update button */}      
                            </View>        
                        </View>        
                    </TouchableOpacity>        
                )}        
            />        
        </View>        
    );        
};        
  
const styles = StyleSheet.create({        
    container: {        
        flex: 1,        
        backgroundColor: '#f5f5f5', // Light background color        
        padding: 10,        
    },        
    centered: {        
        flex: 1,        
        justifyContent: 'center',        
        alignItems: 'center',        
    },        
    errorText: {        
        color: 'red',        
        fontSize: 16,        
    },        
    comicItem: {        
        flexDirection: 'row',        
        padding: 15,        
        backgroundColor: '#fff', // White background for each comic item        
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
    coverImage: {        
        width: 100, // Increased width        
        height: 150, // Increased height        
        marginRight: 15,        
        borderRadius: 5,        
    },        
    comicDetails: {        
        flex: 1,        
        justifyContent: 'center',        
    },        
    title: {        
        fontWeight: 'bold',        
        fontSize: 16,        
    },        
    rating: {        
        color: '#666',        
    },        
});        
  
export default ComicList;        

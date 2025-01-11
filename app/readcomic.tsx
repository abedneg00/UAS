import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, FlatList, TextInput, Button, Dimensions } from "react-native";
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function BacaKomik() {
    const [comicPages, setComicPages] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const route = useRoute();
    const { comicId } = route.params;

    useEffect(() => {
        const fetchComicPages = async () => {
            try {
                const response = await fetch(`https://ubaya.xyz/react/160421142/uas/readcomic.php?comic_id=${comicId}`);
                const data = await response.json();

                if (data.result === "success") {
                    setComicPages(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching comic pages:", error);
            }
        };

        fetchComicPages();
    }, [comicId]);

    const handleCommentSubmit = async () => {      
        try {  
            const response = await fetch(`https://ubaya.xyz/react/160421142/uas/readcomic.php?comic_id=${comicId}`, {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/x-www-form-urlencoded',  
                },  
                body: new URLSearchParams({  
                    comment_text: comment,  
                    rating: rating.toString(), // Send rating as a string  
                }),  
            });  
      
            const data = await response.json();  
            console.log(data.message); // Log the response message  
            setComment(''); // Clear the comment input  
            setRating(0); // Reset the rating input  
        } catch (error) {  
            console.error("Error submitting comment and rating:", error);  
        }  
    };  
        




    const handleRatingSubmit = () => {
        console.log("Rating submitted:", rating);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Baca Komik</Text>

            <FlatList
                data={comicPages}
                keyExtractor={(item) => item.page_id ? item.page_id.toString() : Math.random().toString()}
                renderItem={({ item }) => (
                    <Image source={{ uri: item.image_url }} style={styles.comicImage} resizeMode="contain" />
                )}
                contentContainerStyle={styles.imageList}
            />

            <View style={styles.commentSection}>
                <Text style={styles.commentTitle}>Leave a Comment:</Text>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Write your comment here..."
                    value={comment}
                    onChangeText={setComment}
                />
                <Button title="Submit Comment" onPress={handleCommentSubmit} />
            </View>

            <View style={styles.ratingSection}>
                <Text style={styles.ratingTitle}>Rate this Comic:</Text>
                <TextInput
                    style={styles.ratingInput}
                    placeholder="Enter your rating (1-5)"
                    keyboardType="numeric"
                    value={rating.toString()}
                    onChangeText={(text) => setRating(Number(text))}
                />
                <Button title="Submit Rating" onPress={handleRatingSubmit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    comicImage: {
        width: width,
        height: 500,
        marginBottom: 10,
        borderRadius: 10,
    },
    imageList: {
        paddingBottom: 20,
    },
    commentSection: {
        marginTop: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    commentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentInput: {
        height: 60,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    ratingSection: {
        marginTop: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    ratingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ratingInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});      

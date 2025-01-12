import React, { useEffect, useState } from 'react';  
import { View, Text, TextInput, Button, ScrollView, Alert, ActivityIndicator } from 'react-native';  
import { Picker } from '@react-native-picker/picker';  
import axios from 'axios';  
import { useLocalSearchParams } from 'expo-router';  
import { useRouter } from 'expo-router'; // Import useRouter for navigation  
  
const UpdateComic = () => {  
  const params = useLocalSearchParams();  
  const comicId = params.comicId;  
  
  const [title, setTitle] = useState('');  
  const [author, setAuthor] = useState('');  
  const [releaseDate, setReleaseDate] = useState('');  
  const [description, setDescription] = useState('');  
  const [coverImage, setCoverImage] = useState('');  
  const [categoryId, setCategoryId] = useState('');  
  const [categories, setCategories] = useState([]);  
  const [loading, setLoading] = useState(true); // Loading state  
  const router = useRouter(); // Use router for navigation  
  
  useEffect(() => {  
    const fetchComicData = async () => {  
      try {  
        const response = await fetch(`https://ubaya.xyz/react/160421142/uas/comics.php?comic_id=${comicId}`);  
        if (!response.ok) {  
          throw new Error(`HTTP error! status: ${response.status}`);  
        }  
  
        const data = await response.json();  
        if (data.result === "success") {  
          const comicData = data.data;  
          setTitle(comicData.title);  
          setAuthor(comicData.author);  
          setReleaseDate(comicData.release_date.split(' ')[0]);  
          setDescription(comicData.description);  
          setCoverImage(comicData.cover_image);  
          setCategoryId(comicData.category_id);  
        } else {  
          Alert.alert('Error', data.message);  
        }  
      } catch (error) {  
        console.error("Error fetching comic data:", error);  
        Alert.alert('Error', 'Failed to fetch comic data.');  
      } finally {  
        setLoading(false); // Set loading to false after fetching  
      }  
    };  
  
    const fetchCategories = async () => {  
      try {  
        const response = await axios.get('https://ubaya.xyz/react/160421142/uas/category.php');  
        if (response.data.result === "success") {  
          setCategories(response.data.categories);  
        } else {  
          Alert.alert('Error', response.data.message);  
        }  
      } catch (error) {  
        console.error(error);  
        Alert.alert('Error', 'Failed to fetch categories.');  
      }  
    };  
  
    fetchComicData();  
    fetchCategories();  
  }, [comicId]);  
  
  const handleUpdate = async () => {  
    // Basic validation  
    if (!title || !author || !releaseDate || !description || !coverImage || !categoryId) {  
      Alert.alert('Error', 'Please fill in all fields.');  
      return;  
    }  
  
    try {  
      const response = await fetch('https://ubaya.xyz/react/160421142/uas/comics.php', {  
        method: 'POST',  
        headers: {  
          'Content-Type': 'application/x-www-form-urlencoded',  
        },  
        body: new URLSearchParams({  
          title,  
          author,  
          release_date: releaseDate,  
          description,  
          cover_image: coverImage,  
          category_id: categoryId,  
          comic_id: comicId, // Use the string version of comicId  
        }),  
      });  
  
      const data = await response.json();  
      if (data.result === 'success') {  
        Alert.alert('Success', 'Comic updated successfully!');  
        router.back(); // Use router.back() for navigation  
      } else {  
        Alert.alert('Error', data.message);  
      }  
    } catch (error) {  
      console.error("Error updating comic:", error);  
      Alert.alert('Error', 'An error occurred while updating the comic.');  
    }  
  };  
  
  if (loading) {  
    return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator  
  }  
  
  return (  
    <ScrollView style={{ padding: 20 }}>  
      <Text>Title:</Text>  
      <TextInput  
        value={title}  
        onChangeText={setTitle}  
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}  
      />  
      <Text>Author:</Text>  
      <TextInput  
        value={author}  
        onChangeText={setAuthor}  
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}  
      />  
      <Text>Release Date:</Text>  
      <TextInput  
        value={releaseDate}  
        onChangeText={setReleaseDate}  
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}  
        placeholder="YYYY-MM-DD"  
      />  
      <Text>Description:</Text>  
      <TextInput  
        value={description}  
        onChangeText={setDescription}  
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}  
      />  
      <Text>Cover Image URL:</Text>  
      <TextInput  
        value={coverImage}  
        onChangeText={setCoverImage}  
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}  
      />  
      <Text>Category:</Text>  
      <Picker  
        selectedValue={categoryId}  
        onValueChange={(itemValue) => setCategoryId(itemValue)}  
        style={{ borderWidth: 1, marginBottom: 10 }}  
      >  
        {categories.map((category) => (  
          <Picker.Item key={category.category_id} label={category.name} value={category.category_id} />  
        ))}  
      </Picker>  
      <Button title="Update Comic" onPress={handleUpdate} />  
    </ScrollView>  
  );  
};  
  
export default UpdateComic;  

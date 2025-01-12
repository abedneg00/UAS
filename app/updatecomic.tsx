import React, { useEffect, useState } from 'react';  
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';  
import { Picker } from '@react-native-picker/picker'; // Ensure this import is correct  
import axios from 'axios';  
import { useLocalSearchParams } from 'expo-router';
  
const UpdateComic = ({navigation}) => {  
  const params = useLocalSearchParams();
  const comicId = params.comicId; // This will get the comicId from the URL params
  console.log("Received comicId:", comicId);  
  
  
  const [title, setTitle] = useState('');  
  const [author, setAuthor] = useState('');  
  const [releaseDate, setReleaseDate] = useState('');  
  const [description, setDescription] = useState('');  
  const [coverImage, setCoverImage] = useState('');  
  const [categoryId, setCategoryId] = useState('');  
  const [categories, setCategories] = useState([]); // State for categories    
  
  useEffect(() => {  
    const fetchComicData = async () => {  
      try {  
        const response = await axios.get(`https://ubaya.xyz/react/160421142/uas/comics.php?comic_id=${comicId}`);  
        const comicData = response.data;  
        setTitle(comicData.title);  
        setAuthor(comicData.author);  
        setReleaseDate(comicData.release_date.split('T')[0]); // Set the release date in YYYY-MM-DD format    
        setDescription(comicData.description);  
        setCoverImage(comicData.cover_image);  
        setCategoryId(comicData.category_id); // Set the category ID    
      } catch (error) {  
        console.error(error);  
        Alert.alert('Error', 'Failed to fetch comic data.');  
      }  
    };  
  
    const fetchCategories = async () => {  
      try {  
        const response = await axios.get('https://ubaya.xyz/react/160421142/uas/category.php'); // Adjust the endpoint as needed    
        if (response.data.result === "success") {  
          setCategories(response.data.categories); // Assuming the response contains an array of categories    
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
    console.log("Updating comic with data:", {  
      title,  
      author,  
      releaseDate,  
      description,  
      coverImage,  
      categoryId,  
      comicId, // Ensure comicId is defined and included    
    });  
  
    try {  
      const response = await axios.post('https://ubaya.xyz/react/160421142/uas/comics.php', {  
        title,  
        author,  
        release_date: releaseDate,  
        description,  
        cover_image: coverImage,  
        category_id: categoryId,  
        comic_id: comicId, // Make sure this is included    
      });  
  
      console.log("Response from server:", response.data);  
  
      if (response.data.result === 'success') {  
        Alert.alert('Success', 'Comic updated successfully!');  
        router.back();  // Ganti ini
      } else {  
        Alert.alert('Error', response.data.message);  
      }  
    } catch (error) {  
      console.error("Error updating comic:", error);  
      Alert.alert('Error', 'An error occurred while updating the comic.');  
    }  
  };  
  
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
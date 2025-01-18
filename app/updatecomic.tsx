import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, ActivityIndicator, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';

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
  const [pages, setPages] = useState([]); // State for comic pages      
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchComicData = async () => {
      try {
        const response = await fetch(`https://ubaya.xyz/react/160421142/uas/getdetailcomic.php?comic_id=${comicId}`);
        const data = await response.json();
        if (data.result === "success") {
          const comicData = data.data.comic;
          setTitle(comicData.title);
          setAuthor(comicData.author);
          setReleaseDate(comicData.release_date.split(' ')[0]);
          setDescription(comicData.description);
          setCoverImage(comicData.cover_image);
          setCategoryId(comicData.category_id);

          // Important: Preserve the original page_ids from the database
          if (data.data.pages) {  
            // Make sure to keep the original page_ids (9, 10, 11, 12)  
            setPages(data.data.pages.map(page => ({  
                page_id: page.page_id, // Keep the original page_id  
                image_url: page.image_url,  
                page_number: page.page_number  
            })));  
        } 
        } else {
          Alert.alert('Error', data.message);
        }
      } catch (error) {
        console.error("Error fetching comic data:", error);
        Alert.alert('Error', 'Failed to fetch comic data.');
      } finally {
        setLoading(false);
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
    if (!title || !author || !releaseDate || !description || !coverImage || !categoryId) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);

    const requestData = {
      title,
      author,
      release_date: releaseDate,
      description,
      cover_image: coverImage,
      category_id: parseInt(categoryId, 10),
      comic_id: parseInt(comicId, 10),
      images: JSON.stringify(pages.map(page => ({
        page_id: parseInt(page.page_id, 10),
        image_url: page.image_url,
      }))),
    };

    console.log("Current pages state:", pages);
    console.log("Sending update data:", requestData);

    try {
      const response = await fetch('https://ubaya.xyz/react/160421142/uas/updatecomic.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(requestData),
      });

      const rawResponse = await response.text();
      console.log("Raw server response:", rawResponse);

      let data;
      try {
        data = JSON.parse(rawResponse);
        console.log("Parsed response:", data);

        // Log detailed debug information
        if (data.debug) {
          console.log("Current pages in DB:", data.debug.current_pages);
          console.log("Updates attempted:", data.debug.updates_performed);
          console.log("Final pages state:", data.debug.final_pages);
        }

      } catch (e) {
        console.error("Failed to parse response:", e);
        Alert.alert('Error', 'Server returned invalid response');
        return;
      }

      if (data.result === 'success') {
        // Show success message with debug option
        Alert.alert(
          'Success',
          'Comic updated successfully!',
          // [
            // {
            //   text: 'Show Debug Info',
            //   onPress: () => console.log(JSON.stringify(data.debug, null, 2))
            // },
            // {
            //   text: 'OK',
            //   onPress: () => router.back()
            // }
          // ]

        );
        router.back()
      } else {
        Alert.alert(
          'Error',
          data.message || 'Update failed',
          [
            {
              text: 'Show Debug Info',
              onPress: () => console.log(JSON.stringify(data.debug, null, 2))
            },
            { text: 'OK' }
          ]
        );
      }
    } catch (error) {
      console.error("Error updating comic:", error);
      Alert.alert('Error', 'Failed to update comic. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (index, value) => {
    const updatedPages = [...pages];
    updatedPages[index].image_url = value; // Update the specific page URL      
    setPages(updatedPages);
  };

  const renderPageItem = ({ item, index }) => (  
    <View style={{ marginBottom: 10 }}>  
      <Text>Page {item.page_number} URL:</Text>  
      <TextInput  
        value={item.image_url}  
        onChangeText={(value) => handlePageChange(index, value)}  
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}  
      />  
    </View>  
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
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

      <Text>Pages:</Text>
      <FlatList
        data={pages}
        renderItem={renderPageItem}
        keyExtractor={(item, index) => {
          if (item.page_id) return item.page_id.toString();
          return index.toString(); // Fallback to index if page_id doesn't exist
        }}
      />

      <Button title="Update Comic" onPress={handleUpdate} />
    </ScrollView>
  );
};

export default UpdateComic;  

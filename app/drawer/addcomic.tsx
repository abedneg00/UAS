import { Button } from '@rneui/base';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { TextInput, Text, StyleSheet, ScrollView, View, Picker } from 'react-native';
import { useValidation } from 'react-simple-form-validator';

interface Category {
  id: number;
  name: string;
}

export default function TambahKomik() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releasedate, setReleaseDate] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(''); // State for selected category  
  const [coverimage, setCoverImage] = useState(''); // State for cover image  
  const [images, setImages] = useState(['', '', '', '']); // Initialize with 4 empty strings for additional images  
  // const [categories, setCategories] = useState([]); // State for categories  
  const [categories, setDataCategory] = useState<Category[]>([]);

  const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
    fieldsRules: {
      title: { required: true },
      description: { required: true, minlength: 50 },
      releasedate: { required: true, date: true },
      author: { required: true, minlength: 5 },
      category: { required: true }, // Validation for category  
      coverimage: { required: true, website: true }, // Validation for cover image  
      images: { required: true, minLength: 4 }, // Custom validation for images  
    },
    state: { title, description, releasedate, author, category, coverimage, images },
  });
  const fetchData = async () => {
    try {
      const response = await fetch('https://ubaya.xyz/react/160421142/uas/category.php');
      const resjson = await response.json();
      setDataCategory(resjson.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   // Fetch categories from the database  
  //   fetch('https://ubaya.xyz/react/160421142/uas/category.php') // Adjust the URL to your API endpoint  
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // Check if data is an array  
  //       if (Array.isArray(data)) {
  //         setCategories(data); // Assuming data is an array of categories  
  //       } else {
  //         console.error('Expected an array of categories, but got:', data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching categories:', error);
  //     });
  // }, []);

  const renderErrors = (field) => {
    if (isFieldInError(field)) {
      return getErrorsInField(field).map((errorMessage, index) => (
        <Text key={index} style={styles.errorText}>
          {errorMessage}
        </Text>
      ));
    }
    return null;
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const submitData = () => {
    if (!isFormValid) return; // Prevent submission if the form is not valid  

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Correct content type  
      },
      body: new URLSearchParams({
        title,
        author,
        release_date: releasedate,
        description,
        cover_image: coverimage, // Include cover image in the request  
        images: JSON.stringify(images), // Send images as a JSON string  
        category, // Send selected category  
      }).toString(),
    };

    fetch('https://ubaya.xyz/react/160421142/uas/newcomic.php', options) // Adjust the URL to your API endpoint  
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((resjson) => {
        if (resjson.result === 'success') {
          alert('New Comic Added');
          router.replace("./komiku");   
        } else {
          alert('Failed to add new comic. Please try again.');
        }
      })
      .catch(() => {
        alert('An error occurred while adding the comic. Please try again.');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={setTitle}
        value={title}
      />
      {renderErrors('title')}

      <Text>Description</Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={styles.input2}
        onChangeText={setDescription}
        value={description}
      />
      {renderErrors('description')}

      <Text>Release Date</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        onChangeText={setReleaseDate}
        value={releasedate}
      />
      {renderErrors('releasedate')}

      <Text>Author</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Susi Susanti"
        onChangeText={setAuthor}
        value={author}
      />
      {renderErrors('author')}

      <Text>Category</Text>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Select a category" value="" />
        {categories.map((cat) => (
          <Picker.Item key={cat.id} label={cat.name} value={cat.id} /> // Adjust according to your category structure  
        ))}
      </Picker>
      {renderErrors('category')}

      <Text>Cover Image</Text>
      <TextInput
        style={styles.input}
        placeholder="Cover Image URL"
        onChangeText={setCoverImage}
        value={coverimage}
      />
      {renderErrors('coverimage')}

      <Text>Image Pages</Text>
      {images.map((image, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Image URL ${index + 1}`}
          onChangeText={(value) => handleImageChange(index, value)}
          value={image}
        />
      ))}
      {renderErrors('images')}

      <Button
        title="Submit"
        onPress={submitData}
        disabled={!isFormValid} // Disable button if form is not valid  
        style={{ marginTop: 10 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  input2: {
    height: 100,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
});  

import { Button, Image } from '@rneui/base';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useValidation } from 'react-simple-form-validator';

export default function TambahKomik ()  {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releasedate, setReleaseDate] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  
  const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
    fieldsRules: {
      title: { required: true },
      description: { required: true, minlength:50 },
      releasedate: {required: true, date: true},
      author: {required: true, minlength:5},
      category: {required: true},
      image: {required: true, website: true},
    },
    state: {title, description, releasedate,author, category, image},
  });

  const renderTitleErrors = () => {
    if (isFieldInError('title')) {
      return getErrorsInField('title').map((errorMessage, index) => (
        <Text key={index} style={styles.errorText}>
          {errorMessage}
        </Text>
      ));
    }
    return null;
  };

  const renderDescriptionErrors = () => {
    if (isFieldInError('description')) {
      return getErrorsInField('description').map((errorMessage, index) => (
        <Text key={index} style={styles.errorText}>
          {errorMessage}
        </Text>
      ));
    }
    return null;
  };

  const renderAuthorErrors = () => {
    if (isFieldInError('author')) {
      return getErrorsInField('author').map((errorMessage, index) => (
        <Text key={index} style={styles.errorText}>
          {errorMessage}
        </Text>
      ));
    }
    return null;
  };

  const renderDateErrors = () => {
    if (isFieldInError('releasedate')) {
      return getErrorsInField('releasedate').map((errorMessage, index) => (
        <Text key={index} style={styles.errorText}>
          {errorMessage}
        </Text>
      ));
    }
    return null;
  };

  const renderImageErrors = () => {
    if (isFieldInError('image')) {
      return getErrorsInField('image').map((errorMessage, index) => (
        <Text key={index} style={styles.errorText}>
          {errorMessage}
        </Text>
      ));
    }
    return null;
  };

  const renderCategoryErrors = () => {
    if (isFieldInError('category')) {
      return getErrorsInField('category').map((errorMessage, index) => (
        <Text key={index} style={styles.errorText}>
          {errorMessage}
        </Text>
      ));
    }
    return null;
  };

  const renderPoster = () => {
    if (category != '') {
      return ( 
        <Image
          style={{width:300,height:400}}
          resizeMode="contain"
          source={{ uri: category }}
        />
      );
    }
    return null;
  };

  const renderButtonSubmit = () => {
    if (isFormValid) {
      return ( 
        <Button title="Submit" onPress={submitData} style={{ marginTop:10 }} />
      );
    }
    return null;
  };

  const submitData = () => {
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-categoryencoded'
      }),
      body: "title="+title+"&"+
            "image="+image+"&"+
            "description="+description+"&"+
            "release_date="+releasedate+"&"+
            "author="+author+"&"+
            "category="+category
    };
    try {
      fetch('https://ubaya.xyz/react/160421142/newkomik.php',
      options)
        .then(response => response.json())
        .then(resjson =>{
          console.log(resjson);
          if(resjson.result==='success') {
            alert('New Movie Added');
            router.replace('/daftarkomik/daftarkomik')
          }
        });
    } catch (error) {
      console.log(error);
    } 
  }

  return (
    <ScrollView style={styles.container}>
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={setTitle}
        value={title}
      />
      {renderTitleErrors()}

      <Text>description</Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={styles.input2}
        onChangeText={setDescription} />
      {renderDescriptionErrors()}

      <Text>Release Date</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        onChangeText={setReleaseDate}
        value={releasedate}
      />
      {renderDateErrors()}
      
      <Text>author</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Susi Susanti"
        onChangeText={setAuthor}
        value={author}
      />
      {renderAuthorErrors()}

      <Text>category Poster</Text>
      <TextInput
        style={styles.input}
        placeholder="Image category"
        onChangeText={setCategory}
        value={category}
      />
      {renderCategoryErrors()}

      <Text>image</Text>
      <TextInput
        style={styles.input}
        placeholder="www.example.com"
        onChangeText={setImage}
        value={image}
      />
      {renderImageErrors()}

      {renderButtonSubmit()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    backgroundColor :'#fff',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  input2: {
    height: 100,
    borderColor: '#ccc',
    backgroundColor :'#fff',
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
});
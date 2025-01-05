import React from 'react';
import { View, Text, Button } from 'react-native';

const CategoryScreen = ({ navigation }) => {
  const categories = ['Comedy', 'Action', 'Horror'];
  
  return (
    <View style={{ flex: 1, padding: 20 }}>
      {categories.map((category, index) => (
        <Button
          key={index}
          title={category}
          onPress={() => navigation.navigate('DaftarKomik', { category })} // Pastikan nama ini sesuai
        />
      ))}
    </View>
  );
};

export default CategoryScreen;

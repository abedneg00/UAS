import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DaftarKomik = ({ route }) => {
  const { category } = route.params; // Mengambil kategori dari parameter

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Komik Kategori: {category}</Text>
      {/* Di sini Anda bisa menampilkan daftar komik berdasarkan kategori */}
      {/* Misalnya, Anda bisa menggunakan FlatList untuk menampilkan daftar komik */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DaftarKomik;

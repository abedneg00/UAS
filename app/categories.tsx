import React, { Component } from 'react';  
import { View, Text, FlatList, ActivityIndicator } from 'react-native';  
  
class Categories extends Component {  
  state = {  
    data: [],  
    loading: true, // Menambahkan state loading  
    error: null, // Menambahkan state error  
  };  
  
  fetchData = async () => {  
    try {  
      const response = await fetch('https://ubaya.xyz/react/160421142/uas/category.php');  
      const resjson = await response.json();  
        
      // Memeriksa apakah data ada  
      if (resjson && resjson.data) {  
        this.setState({  
          data: resjson.data,  
          loading: false, // Mengubah loading menjadi false setelah data diambil  
        });  
      } else {  
        this.setState({  
          loading: false,  
          error: 'Data tidak ditemukan', // Menangani kasus jika data tidak ada  
        });  
      }  
    } catch (error) {  
      console.log(error);  
      this.setState({  
        loading: false,  
        error: 'Terjadi kesalahan saat mengambil data', // Menangani kesalahan fetching  
      });  
    }  
  }  
  
  componentDidMount() {  
    this.fetchData();  
  }  
  
  showData(data) {  
    if (this.state.loading) {  
      return <ActivityIndicator size="large" color="#0000ff" />; // Menampilkan loading indicator  
    }  
  
    if (this.state.error) {  
      return <Text>{this.state.error}</Text>; // Menampilkan pesan error jika ada  
    }  
  
    if (data.length === 0) {  
      return <Text>No categories available</Text>; // Menampilkan pesan jika tidak ada data  
    }  
  
    return (  
      <FlatList  
        data={data}  
        keyExtractor={(item) => item.category_id.toString()}  
        renderItem={({ item }) => (  
          <Text>{item.name}</Text>  
        )}  
      />  
    );  
  }  
  
  render() {  
    return (  
      <View>  
        {this.showData(this.state.data)}  
      </View>  
    );  
  }  
}  
  
export default Categories;  
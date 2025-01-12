import { StyleSheet, View, Text, FlatList } from "react-native";    
import React, { Component } from "react";    
import { Card } from "@rneui/base";    
import { ScrollView, TextInput } from "react-native-gesture-handler";    
import { Link } from "expo-router";    
    
class SearchComic extends Component {    
  state = {    
    data: [],    
    search: "",    
  };    
    
  fetchData = async () => {  
    const options = {  
      method: "POST",  
      headers: new Headers({  
        "Content-Type": "application/x-www-form-urlencoded",  
      }),  
      body: "cari=" + encodeURIComponent(this.state.search), // Encode the search term  
    };  
  
    try {  
      const response = await fetch("https://ubaya.xyz/react/160421142/uas/searchcomic.php", options);  
        
      // Check if the response is OK  
      if (!response.ok) {  
        throw new Error(`HTTP error! status: ${response.status}`);  
      }  
  
      const resjson = await response.json(); // Parse the JSON response  
  
      // Check if the result is successful  
      if (resjson.result === "success") {  
        this.setState({  
          data: resjson.data,  
        });  
      } else {  
        console.log(resjson.message); // Log any error messages  
      }  
    } catch (error) {  
      console.log("Fetch error:", error);  
    }  
  };  
  
  componentDidMount() {    
    this.fetchData();    
  }    
    
  showData(data) {    
    return (    
      <FlatList    
        data={data}    
        keyExtractor={(item) => item.comic_id.toString()}    
        renderItem={({ item }) => (    
          <Card>    
            <Card.Title>{item.title}</Card.Title>    
            <Card.Divider />    
            <Card.Image    
              style={{ width: 200, height: 300, margin: "auto" }}    
              source={{ uri: item.cover_image }} // Assuming you have an image_url field    
            />    
            <Text style={{ marginBottom: 10 }}>{item.category_id}</Text>    
          </Card>    
        )}    
      />    
    );    
  }    
    
  render() {    
    return (    
      <ScrollView>    
        <Card>    
          <View style={styles.viewRow}>    
            <Text>Search Comic</Text>    
            <TextInput    
              style={styles.input}    
              onChangeText={(search) => this.setState({ search })}    
              onSubmitEditing={() => this.fetchData()}    
              placeholder="Masukkan judul komik"    
            />    
          </View>    
        </Card>    
    
        <Card>    
          <View>    
            {this.showData(this.state.data)}    
          </View>    
        </Card>    
      </ScrollView>    
    );    
  }    
}    
    
const styles = StyleSheet.create({    
  input: {    
    height: 40,    
    width: 200,    
    borderWidth: 1,    
    padding: 10,    
  },    
  viewRow: {    
    flexDirection: "row",    
    justifyContent: "center",    
    alignItems: "center",    
    paddingRight: 50,    
    margin: 3,    
  },    
});    
    
export default SearchComic;    

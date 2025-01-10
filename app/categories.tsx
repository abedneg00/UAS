import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import ComicList from "./comiclist/comiclist";

class Categories extends Component {
  state = {
    data: [],
  };

  fetchData = async () =>  {
    try {
      fetch('https://ubaya.xyz/react/160421142/uas/category.php')
        .then(response => response.json())
        .then(resjson =>{
          this.setState({
            data: resjson.data
           });
        });
    } catch (error) {
      console.log(error);
    } 
  }

  componentDidMount() {    
      this.fetchData();
  }

  showData(data:any){
    return <FlatList
      data={data}
      keyExtractor={(item) => item.category_id.toString()}
      renderItem={({item}) => (
         <Text>{item.name}</Text>
      )}
    />
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
import * as React from 'react';  
import { Button, Card, Text } from "@rneui/base";  
import { StyleSheet, View, TextInput, ActivityIndicator } from 'react-native';  
import { useAuth } from './authContext';  
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { useRouter } from 'expo-router'; // Import useRouter  
  
function Login() {  
  const styles = StyleSheet.create({  
    input: {  
      height: 40,  
      width: 200,  
      borderWidth: 1,  
      padding: 10,  
      marginBottom: 10,  
    },  
    button: {  
      height: 40,  
      width: 200,  
    },  
    viewRow: {  
      flexDirection: "row",  
      justifyContent: "center",  
      alignItems: 'center',  
      paddingRight: 50,  
      margin: 3  
    },  
    loading: {  
      marginTop: 20,  
    }  
  });  
  
  const { login } = useAuth(); // Access login function from context  
  const [username, setUsername] = React.useState(''); // State for username  
  const [password, setPassword] = React.useState(''); // State for password  
  const [loading, setLoading] = React.useState(false); // State for loading  
  const router = useRouter(); // Get router instance  
  
  const doLogin = async () => {  
    if (!username || !password) {  
      alert('Please enter both username and password');  
      return;  
    }  
  
    setLoading(true); // Set loading to true  
    const options = {  
      method: 'POST',  
      headers: new Headers({  
        'Content-Type': 'application/x-www-form-urlencoded'  
      }),  
      body: `uid=${username}&upw=${password}`  
    };  
  
    try {  
      const response = await fetch('https://ubaya.xyz/react/160421142/login.php', options);  
      const json = await response.json();  
  
      if (json.result === 'success') {  
        await AsyncStorage.setItem('username', username);  
        alert('Login successful');  
        login(); // Use the login function from context  
        router.replace("/kategori"); // Redirect to kategori after successful login  
      } else {  
        alert('Username or password is incorrect');  
      }  
    } catch (error) {  
      console.error('Error during login:', error);  
      alert('An error occurred. Please try again later.');  
    } finally {  
      setLoading(false); // Set loading to false  
    }  
  };  
  
  return (  
    <Card>  
      <Card.Title>Silakan Login</Card.Title>  
      <Card.Divider />  
      <View style={styles.viewRow}>  
        <Text>Username </Text>  
        <TextInput  
          style={styles.input}  
          onChangeText={(text) => setUsername(text)}  
          value={username}  
        />  
      </View>  
      <View style={styles.viewRow}>  
        <Text>Password </Text>  
        <TextInput  
          secureTextEntry={true}  
          style={styles.input}  
          onChangeText={(text) => setPassword(text)}  
          value={password}  
        />  
      </View>  
      <View style={styles.viewRow}>  
        <Button  
          style={styles.button}  
          title="Submit"  
          onPress={doLogin}  
          disabled={loading} // Disable button while loading  
        />  
      </View>  
      {loading && <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />} {/* Loading indicator */}  
    </Card>  
  );  
}  
  
export default Login;  

import { Stack, useRouter } from "expo-router"; // Import useRouter    
import { AuthProvider, useAuth } from "./authContext";  
import { useEffect, useState } from "react";  
import React from 'react';  
import {  
  createDrawerNavigator,  
  DrawerContentScrollView,  
  DrawerItemList,  
  DrawerItem,  
} from '@react-navigation/drawer';  
import BacaKomik from "./readcomic";  
import CariKomik from "./searchcomic";  
import TambahKomik from "./addcomic";  
import Kategori from "./categories";  
import DaftarKomik from "./comiclist/comiclist";  
import UpdateKomik from "./updatecomic";  
import AsyncStorage from "@react-native-async-storage/async-storage";  
  
function RootLayout() {  
  const { isLoggedIn, logout } = useAuth(); // Get logged-in status and logout function    
  const [username, setUsername] = useState<string>("");  
  const router = useRouter(); // Get router instance    
  const Drawer = createDrawerNavigator();  
  
  const cekLogin = async () => {  
    try {  
      const value = await AsyncStorage.getItem("username");  
      if (value !== null) {  
        setUsername(value);  
      } else {  
        setUsername("");  
        logout();  
      }  
    } catch (e) {  
      console.error("Error reading username from AsyncStorage", e);  
      setUsername("");  
      logout();  
    }  
  };  
  
  useEffect(() => {  
    cekLogin();  
  }, []);  
  
  const doLogout = async () => {  
    try {  
      await AsyncStorage.removeItem("username");  
      alert("Logged out");  
      logout();  
      router.replace("/login");  
    } catch (e) {  
      console.error("Error during logout", e);  
    }  
  };  
  
  useEffect(() => {  
    // This effect will run after the component mounts    
    if (!isLoggedIn) {  
      // If not logged in, navigate to login    
      router.replace("/login");  
    } else {  
      // If logged in, navigate to kategori    
      router.replace("/kategori");  
    }  
  }, [isLoggedIn, router]); // Include router in the dependency array    
  
  // Custom Drawer Content  
  const CustomDrawerContent = (props) => {  
    return (  
      <DrawerContentScrollView {...props}>  
        <DrawerItemList {...props} />  
        <DrawerItem label="Log Out" onPress={doLogout} />  
      </DrawerContentScrollView>  
    );  
  };  
  
  return (  
    <Drawer.Navigator  
      drawerContent={(props) => <CustomDrawerContent {...props} />}  
    >  
      <Drawer.Screen name="Category Comic" component={Kategori}  
        options={{ drawerLabel: 'Category Comic' }} />  
      <Drawer.Screen name="Baca Komik" component={BacaKomik}  
        options={{ drawerLabel: 'Read Comic' }} />  
      <Drawer.Screen name="List Comic" component={DaftarKomik}  
        options={{ drawerLabel: 'List Comic' }} />  
      <Drawer.Screen name="Search Comic" component={CariKomik}  
        options={{ drawerLabel: 'Search Comic' }} />  
      <Drawer.Screen name="Add Comic" component={TambahKomik}  
        options={{ drawerLabel: 'Add Comic' }} />  
      <Drawer.Screen name="Update Comic" component={UpdateKomik}  
        options={{ drawerLabel: 'Update Comic' }} />  
    </Drawer.Navigator>  
  );  
}  
  
export default function Layout() {  
  return (  
    <AuthProvider>  
      <RootLayout />  
    </AuthProvider>  
  );  
}  

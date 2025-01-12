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
import ComicList from "./ComicList";
  
const Drawer = createDrawerNavigator(); // Move this outside of the component  
  
function RootLayout() {    
  const { isLoggedIn, logout } = useAuth(); // Get logged-in status and logout function      
  const [username, setUsername] = useState<string>("");    
  const router = useRouter();    
    
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
    if (!isLoggedIn) {    
      router.replace("/login");    
    } else {    
      router.replace("/kategori");    
    }    
  }, [isLoggedIn, router]);    
    
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
      <Drawer.Screen name="BacaKomik" component={BacaKomik}    
        options={{ drawerLabel: 'Read Comic' }} />    
      <Drawer.Screen name="ComicList" component={ComicList} 
        options={{ drawerLabel: 'Comic List' }} />   
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

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
import BacaKomik from "./bacakomik";  
import CariKomik from "./carikomik";  
import TambahKomik from "./tambahkomik";  
import Kategori from "./kategori";  
import DaftarKomik from "./daftarkomik/daftarkomik";  
import UpdateKomik from "./updatekomik";  
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
      <Drawer.Screen name="Kategori Komik" component={Kategori}  
        options={{ drawerLabel: 'Kategori Komik' }} />  
      <Drawer.Screen name="Baca Komik" component={BacaKomik}  
        options={{ drawerLabel: 'Baca Komik' }} />  
      <Drawer.Screen name="Daftar Komik" component={DaftarKomik}  
        options={{ drawerLabel: 'Daftar Komik' }} />  
      <Drawer.Screen name="Cari Komik" component={CariKomik}  
        options={{ drawerLabel: 'Cari Komik' }} />  
      <Drawer.Screen name="Tambah Komik" component={TambahKomik}  
        options={{ drawerLabel: 'Tambah Komik' }} />  
      <Drawer.Screen name="Update Komik" component={UpdateKomik}  
        options={{ drawerLabel: 'Update Komik' }} />  
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

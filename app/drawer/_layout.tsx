import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Category from './categories';
import AddComic from './addcomic';
import SearchComic from './searchcomic';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider, useAuth } from '../authContext';
import LogOut from './logout';
import { useRouter } from 'expo-router';
import Komiku from './komiku';

const Drawer = createDrawerNavigator();

function DrawerLayout() {
  const { isLoggedIn } = useAuth();
  const [username, setUsername] = useState<string>("");

  const cekLogin = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUsername(value);
      } else {
        setUsername("Username Not Found");
      }
    } catch (e) {
      console.error("Error reading username from AsyncStorage", e);
      setUsername("Not Found");
    }
  };
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="komiku" component={Komiku} options={{ drawerLabel: "KOMIKU", title: username }} />
      <Drawer.Screen name="Category Comic" component={Category}
        options={{ drawerLabel: 'Category Comic' }} />
      <Drawer.Screen name="Add Comic" component={AddComic}
        options={{ drawerLabel: 'Add Comic' }} />
      <Drawer.Screen name="Search Comic" component={SearchComic}
        options={{ drawerLabel: 'Search Comic' }} />
      <Drawer.Screen name="Log Out" component={LogOut} options={{ drawerLabel: 'Log Out' }} />
    </Drawer.Navigator>
  );
};

export default function LayoutDrawer() {
  return (
    <AuthProvider>
      <DrawerLayout />
    </AuthProvider>
  );
} 
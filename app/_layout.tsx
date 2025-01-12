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
import CariKomik from "./drawer/searchcomic";    
import TambahKomik from "./drawer/addcomic";    
import Kategori from "./drawer/categories";    
// import DaftarKomik from "./comiclist/comiclist";    
import UpdateKomik from "./updatecomic";    
import AsyncStorage from "@react-native-async-storage/async-storage";    
import ComicList from "./ComicList";
  
const Drawer = createDrawerNavigator(); // Move this outside of the component  
  
function RootLayout() {    
  const { isLoggedIn } = useAuth(); // Get logged-in status and logout function      
  // const [username, setUsername] = useState<string>("");    
  const router = useRouter();    
    
  // const cekLogin = async () => {    
  //   try {    
  //     const value = await AsyncStorage.getItem("username");    
  //     if (value !== null) {    
  //       setUsername(value);    
  //     } else {    
  //       setUsername("");    
  //       logout();    
  //     }    
  //   } catch (e) {    
  //     console.error("Error reading username from AsyncStorage", e);    
  //     setUsername("");    
  //     logout();    
  //   }    
  // };    
    
  // useEffect(() => {    
  //   cekLogin();    
  // }, []);    
    
  // const doLogout = async () => {    
  //   try {    
  //     await AsyncStorage.removeItem("username");    
  //     alert("Logged out");    
  //     logout();    
  //     router.replace("/login");    
  //   } catch (e) {    
  //     console.error("Error during logout", e);    
  //   }    
  // };    
    
  useEffect(() => {    
    if (!isLoggedIn) {    
      router.replace("/login");    
    } else {    
      router.replace("./drawer/");    
    }    
  }, [isLoggedIn]);    
    
  // // Custom Drawer Content    
  // const CustomDrawerContent = (props) => {    
  //   return (    
  //     <DrawerContentScrollView {...props}>    
  //       <DrawerItemList {...props} />    
  //       <DrawerItem label="Log Out" onPress={doLogout} />    
  //     </DrawerContentScrollView>    
  //   );    
  // };    
    
  return (    
    // <Drawer.Navigator    
    //   drawerContent={(props) => <CustomDrawerContent {...props} />}    
    // >    
    //   <Drawer.Screen name="Category Comic" component={Kategori}    
    //     options={{ drawerLabel: 'Category Comic' }} />    
    //   <Drawer.Screen name="BacaKomik" component={BacaKomik}    
    //     options={{ drawerLabel: 'Read Comic' }} />    
    //   <Drawer.Screen name="ComicList" component={ComicList} 
    //     options={{ drawerLabel: 'Comic List' }} />   
    //   <Drawer.Screen name="Search Comic" component={CariKomik}    
    //     options={{ drawerLabel: 'Search Comic' }} />    
    //   <Drawer.Screen name="Add Comic" component={TambahKomik}    
    //     options={{ drawerLabel: 'Add Comic' }} />    
    //   <Drawer.Screen name="Update Comic" component={UpdateKomik}    
    //     options={{ drawerLabel: 'Update Comic' }} />    
        
    // </Drawer.Navigator>    
    <Stack>
      <Stack.Screen name="login" />
      <Stack.Screen name="drawer" options={{ headerShown: false }} />
      <Stack.Screen name="readcomic" options={{ title: 'Read Comic' }} />
      <Stack.Screen name="udpatecomic" options={{ title: 'Update Comic' }} />
      <Stack.Screen name="listcomic" options={{ title: 'List Comic' }} />
    </Stack>
  );    
}    
    
export default function Layout() {    
  return (    
    <AuthProvider>    
      <RootLayout />    
    </AuthProvider>    
  );    
}    

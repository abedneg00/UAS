// import { Stack, useRouter } from "expo-router";
// import { AuthProvider, useAuth } from "./authContext";
// import React, { useEffect, useState } from "react";
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
// import BacaKomik from "./bacakomik";
// import CariKomik from "./carikomik";
// import TambahKomik from "./tambahkomik";
// import Kategori from "./kategori";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Text, View, Button, StyleSheet } from "react-native";

// const Drawer = createDrawerNavigator();

// function DrawerLayout() {
//   const { isLoggedIn, logout } = useAuth(); // Get logged-in status and logout function
//   const router = useRouter();
//   const [username, setUsername] = useState("");
  

//   const cekLogin = async () => {
//     try {
//       const value = await AsyncStorage.getItem("username");
//       if (value !== null) {
//         setUsername(value);
//       } else {
//         setUsername("");
//         logout(); // Call logout if no username found
//       }
//     } catch (e) {
//       console.error("Error reading username from AsyncStorage", e);
//       setUsername("");
//       logout(); // Call logout on error
//     }
//   };

//   useEffect(() => {
//     cekLogin(); // Check login status on component mount
//   }, []);

//   const doLogout = async () => {
//     try {
//       await AsyncStorage.removeItem("username");
//       alert("You have logged out");
//       logout(); // Call logout from context
//       router.replace("/login"); // Redirect to login after logout
//     } catch (e) {
//       console.error("Error removing username from AsyncStorage", e);
//     }
//   };

//   useEffect(() => {
//     // Redirect based on login status
//     if (!isLoggedIn) {
//       router.replace("/login"); // If not logged in, redirect to login screen
//     }
//   }, [isLoggedIn]);

//   return (
//     <Drawer.Navigator
//       initialRouteName="Baca Komik"
//       drawerContent={(props) => (
//         <View style={{ flex: 1 }}>
//           <View style={styles.header}>
//             <Text style={styles.headerText}>Welcome, {username}</Text>
//           </View>
//           <DrawerContentScrollView {...props}>
//             <DrawerItemList {...props} />
//             <DrawerItem
//               label="Logout"
//               onPress={doLogout}
//             />
//           </DrawerContentScrollView>
//         </View>
//       )}
//     >
//       <Drawer.Screen name="Kategori Komik" component={Kategori} />
//       <Drawer.Screen name="Baca Komik" component={BacaKomik} />
//       <Drawer.Screen name="Cari Komik" component={CariKomik} />
//       <Drawer.Screen name="Tambah Komik" component={TambahKomik} />
//     </Drawer.Navigator>
//   );
// }

// export default function Layout() {
//   return (
//     <AuthProvider>
//       <DrawerLayout />
//     </AuthProvider>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     padding: 20,
//     backgroundColor: '#f7f7f7',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

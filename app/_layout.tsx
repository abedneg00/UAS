import { Stack } from "expo-router";  
import { AuthProvider, useAuth } from "./authContext";  
import { useEffect, useState } from "react";  
  
function RootLayout() {  
  const { isLoggedIn } = useAuth(); // Get logged-in status  
  const [isReady, setIsReady] = useState(false); // State to track if the component is ready  
  
  useEffect(() => {  
    // Set the component as ready after the first render  
    setIsReady(true);  
  }, []);  
  
  if (!isReady) {  
    return null; // Render nothing until the component is ready  
  }  
  
  return (  
    <Stack>  
      <Stack.Screen name="login" options={{ title: 'Login' }} />  
      <Stack.Screen name="komedi" options={{ title: 'Komedi' }} />  
      <Stack.Screen name="action" options={{ title: 'Action' }} />  
      <Stack.Screen name="horror" options={{ title: 'Horror' }} />  
      <Stack.Screen name="kategori" options={{ title: 'Kategori' }} />  
      <Stack.Screen name="daftarkomik" options={{ title: 'Daftar Komik' }} />  
      <Stack.Screen name="bacakomik" options={{ title: 'Baca Komik' }} />  
      <Stack.Screen name="tambahkomik" options={{ title: 'Tambah Komik' }} />  
      <Stack.Screen name="updatekomik" options={{ title: 'Update Komik' }} />  
      <Stack.Screen name="carikomik" options={{ title: 'Cari Komik' }} />  
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

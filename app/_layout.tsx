import { Stack, useRouter } from "expo-router"; // Import useRouter  
import { AuthProvider, useAuth } from "./authContext";  
import { useEffect } from "react";  
  
function RootLayout() {  
  const { isLoggedIn } = useAuth(); // Get logged-in status  
  const router = useRouter(); // Get router instance  
  
  useEffect(() => {  
    // This effect will run after the component mounts  
    if (isLoggedIn) {  
      // If logged in, navigate to kategori  
      router.replace("/login");  
    } else {  
      // If not logged in, navigate to login  
      router.replace("/kategori");  
    }  
  }, [isLoggedIn, router]); // Include router in the dependency array  
  
  return (  
    <Stack initialRouteName="login"> {/* Set initial route to login */}  
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

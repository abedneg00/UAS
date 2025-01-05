import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "./authContext";
import { useEffect } from "react";

function RootLayout() {
  const { isLoggedIn } = useAuth(); // Get logged-in status
  const router = useRouter();
  useEffect(() => {
    // Redirect based on login status
    if (!isLoggedIn) {
      // If not logged in, redirect to login screen
      router.replace("/login");
    } else {
      // If logged in, redirect to index
      router.replace("/kategori");
    }
  }, [isLoggedIn]);

  return (
    <Stack>
      {/* <Stack.Screen name="index" /> */}
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
    //halaman yang mau didaftarkan disini
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}


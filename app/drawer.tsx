import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import KategoriScreen from './kategori'; // Ganti dengan path yang sesuai
import DaftarKomikScreen from './daftarkomik/daftarkomik'; // Ganti dengan path yang sesuai
import BacaKomikScreen from './bacakomik'; // Ganti dengan path yang sesuai
import TambahKomikScreen from './tambahkomik'; // Ganti dengan path yang sesuai
import CariKomikScreen from './carikomik'; // Ganti dengan path yang sesuai

const Drawer = createDrawerNavigator();

const DrawerLayout = () => {
  return (
    <Drawer.Navigator initialRouteName="Kategori">
      <Drawer.Screen name="Kategori" component={KategoriScreen} />
      <Drawer.Screen name="Daftar Komik" component={DaftarKomikScreen} />
      <Drawer.Screen name="Baca Komik" component={BacaKomikScreen} />
      <Drawer.Screen name="Tambah Komik" component={TambahKomikScreen} />
      <Drawer.Screen name="Cari Komik" component={CariKomikScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerLayout;

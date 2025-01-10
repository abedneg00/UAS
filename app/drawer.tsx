import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import KategoriScreen from './categories'; // Ganti dengan path yang sesuai
import DaftarKomikScreen from './comiclist/comiclist'; // Ganti dengan path yang sesuai
import BacaKomikScreen from './readcomic'; // Ganti dengan path yang sesuai
import TambahKomikScreen from './addcomic'; // Ganti dengan path yang sesuai
import CariKomikScreen from './searchcomic'; // Ganti dengan path yang sesuai

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

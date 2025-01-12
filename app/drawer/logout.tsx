import { Stack, useRouter } from "expo-router"; // Import useRouter      
import { AuthProvider, useAuth } from "../authContext";
import { useEffect, useState } from "react";
import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogOut() {
    const { logout } = useAuth();     
    const [username, setUsername] = useState<string>("");
    const router = useRouter();

    // const cekLogin = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem("username");
    //         if (value !== null) {
    //             setUsername(value);
    //         } else {
    //             setUsername("");
    //             logout();
    //         }
    //     } catch (e) {
    //         console.error("Error reading username from AsyncStorage", e);
    //         setUsername("");
    //         logout();
    //     }
    // };
    // useEffect(() => {
    //     cekLogin();
    // }, []);

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
    return (
        doLogout()
    );
}

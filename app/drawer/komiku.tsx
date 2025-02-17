import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider, useAuth } from "../authContext";

export default function Komiku() {
    const [username, setUsername] = useState<string>("");
    const cekLogin = async () => {
        try {
            const value = await AsyncStorage.getItem("username");
            if (value !== null) {
                setUsername(value);
            } else {
                setUsername("");
            }
        } catch (e) {
            console.error("Error reading username from AsyncStorage", e);
            setUsername("");
        }
    };

    useEffect(() => {
        cekLogin();
    }, [username]);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>KOMIKU</Text>
            <View style={styles.decorativeLine} />
            <Text style={styles.creator}>Creator 1: 160421046</Text>
            <Text style={styles.creator}>Creator 2: 160421142</Text>
            <View style={styles.decorativeLine} />
            <Text style={{ color: "#004d40", fontSize: 30 }}>Hello {username}!</Text>    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0f7fa', // Light cyan background for a fresh look    
        padding: 20,
        paddingTop: 50, // Extra padding at the top    
    },
    title: {
        fontSize: 48, // Larger font size for the title    
        fontWeight: 'bold',
        color: '#004d40', // Changed to match the content color    
        textAlign: 'center',
        marginBottom: 10,
        textShadowColor: '#000', // Adding shadow for depth    
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    creator: {
        fontSize: 24, // Slightly larger font size for creators    
        color: '#004d40', // Darker teal for better contrast    
        textAlign: 'center',
        marginVertical: 10,
        fontStyle: 'italic', // Italic style for emphasis    
    },
    decorativeLine: {
        height: 3, // Thicker line for more impact    
        width: '80%',
        backgroundColor: '#004d40', // Changed to match the title color    
        marginVertical: 10,
        borderRadius: 5, // Rounded edges for a softer look    
    },
});    

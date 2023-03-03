import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View, Text, Button, Image, TouchableOpacity, MaterialIcons, TouchableHighlight, Linking } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
//import location from "./Main"
import Geolocation from "react-native-geolocation-service" // 👈
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"

export default function Denied({ navigation }) {
    const [location, setLocation] = useState(null) // 👈
    const [permissionCheck_1, setpermissionCheck_1] = useState(null)
    const handleLocationPermission_redirect = async () => {
        let permissionCheck = ""
        if (Platform.OS === "ios") {
            permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)

            if (permissionCheck === RESULTS.DENIED) {
                const permissionRequest = await request(
                    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                )
                permissionRequest === RESULTS.GRANTED
                    ? console.warn("Location permission granted.")
                    : console.warn("Location perrmission denied.")
            }
        }

        if (Platform.OS === "android") {
            permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

            if (permissionCheck === RESULTS.DENIED) {
                const permissionRequest = await request(
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                )
                permissionRequest === RESULTS.GRANTED
                    ? console.warn("Location permission granted.")
                    : console.warn("Location perrmission denied.")
            }
        }
        if (permissionCheck == RESULTS.GRANTED) {
            setpermissionCheck_1(RESULTS.GRANTED);
        } else {
            setpermissionCheck_1(RESULTS.DENIED);
        }
        if (permissionCheck == RESULTS.GRANTED) {
            navigation.navigate('PageName');
        } else {
            navigation.navigate('DeniedName');
        }
    }
    // useEffect(() => {
    //     if (permissionCheck_1 !== RESULTS.GRANTED) {
    //         handleLocationPermission_redirect();
    //         if (permissionCheck_1 == RESULTS.DENIED) {
    //             setpermissionCheck_1(RESULTS.BLOCKED);
    //         } else {
    //             setpermissionCheck_1(RESULTS.DENIED);
    //         }
    //     }
    // }, [])
    setTimeout(() => {
        handleLocationPermission_redirect();
    }, 5000);
    return (
        <View>
            <Text>
                Перейдите в "Разрешение", далее кликните на "Местоположение" и выберете "Разрешить".
                После этого вернитесь в приложение.
                Для прехода к настройкам нажмите кнопку внизу экрана.
            </Text>
            <Button title='Запросить доступ' onPress={() => { Linking.openSettings() }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    but: {
        // bore
    },

});

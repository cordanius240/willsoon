import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View, Text, Button } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"
import Geolocation from "react-native-geolocation-service" // 👈
export default function Main({ navigation }) {
    const loadPage = () => {
        navigation.navigate('PageName');
    }

    const foo = () => {
        loadPage();
    }
    const [location, setLocation] = useState(null) // 👈

    const handleLocationPermission = async () => {
        let permissionCheck = ""
        while (permissionCheck !== RESULTS.GRANTED) {
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
                        ? console.log("Location permission granted.")
                        : console.log("Location perrmission denied.")
                }
            }
            if (permissionCheck == RESULTS.GRANTED) {
                foo();
            }
        }
    }
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
            foo();
        } else {
            navigation.navigate('DeniedName');
        }
    }

    useEffect(() => {
        handleLocationPermission_redirect()
    }, [])
    useEffect(() => { // 👈
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords
                setLocation({ latitude, longitude })
            },
            error => {
                console.log(error.code, error.message)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    }, [])
    return (
        <View>
            <Button title='запросить доступ' onPress={() => { handleLocationPermission_redirect }} />
        </View>
    );
}

const styles = StyleSheet.create({

});

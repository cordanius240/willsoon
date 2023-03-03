import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View, Text, Button, Image, TouchableOpacity, MaterialIcons, TouchableHighlight, Linking } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
//import location from "./Main"
import Geolocation from "react-native-geolocation-service" // 👈
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"

export default function Page({ navigation }) {
    const loadPage = () => {
        navigation.navigate('MainName');
    }
    const [location, setLocation] = useState(null) // 👈
    const mapViewRef = useRef(null);

    const handleLocationPermission = async () => {
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
    }

    useEffect(() => {
        handleLocationPermission()
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
    handleLocationPermission();
    // Geolocation.getCurrentPosition(
    //     position => {
    //         const { latitude, longitude } = position.coords
    //         setLocation({ latitude, longitude })
    //     },
    //     error => {
    //         console.log(error.code, error.message)
    //     },
    //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    // )
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            {location && ( // 👈
                <MapView
                    ref={mapViewRef}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: location.latitude,  // 👈
                        longitude: location.longitude,// 👈
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                >
                    {/* <Marker
                        // style={styles.mark}
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}>
                        <Image source={require('./marker.png')} style={{ height: 35, width: 35 }} />
                    </Marker> */}
                </MapView>

            )}
            {/* <View
                style={{
                    position: 'absolute',//use absolute position to show button on top of the map
                    top: '2%', //for center align
                    right: '2%',
                    alignSelf: 'flex-end' //for align to right
                }}
            >
                <TouchableHighlight style={styles.but} onPress={() => {
                    mapViewRef.current?.animateToRegion({
                        latitude: location.latitude,  // 👈
                        longitude: location.longitude,// 👈
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }, 300)
                }}>
                    <Image source={require('./icon.png')} style={{ height: 35, width: 35 }} />
                </TouchableHighlight>
            </View> */}
        </SafeAreaView>

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

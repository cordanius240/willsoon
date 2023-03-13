import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View, Text, Button, Image, TouchableOpacity, MaterialIcons, TouchableHighlight, Linking } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import FABMenu from "./FABmenu"
import Geolocation from "react-native-geolocation-service" // 👈
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"
import { FAB, Portal, Provider } from 'react-native-paper';
import PopupPage from './PopupPage';
import FriendList from './Friends_list';

export const Page = ({ route, navigation }) => {
    const { acctkn, rfrtkn } = route.params;
    console.log(acctkn)
    const [isPopupVisible, setPopupVisible] = useState(false);

    const openPopup = () => {
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };
    const ChatsPage = () => {
        navigation.navigate('ChatList', { acctkn: acctkn, rfrtkn: rfrtkn });
    };
    const loadPage = () => {
        navigation.navigate('MainName');
    }
    const console_friends = async () => {
        const response = await fetch('http://192.168.1.134:8080/api/v1/user/friends', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + acctkn,
            },
        })
        const resp = await response.json()
        const rr = resp[0].id
        //}).then(response => response.json()).then(response => { resp = response })
        console.log(rr)
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
            <View
                style={{
                    position: 'absolute',//use absolute position to show button on top of the map
                    top: '10%', //for center align
                    right: '10%',
                    alignSelf: 'flex-end' //for align to right
                }}
            ><TouchableHighlight style={styles.but} onPress={ChatsPage}>
                    <Image source={require('./chatimage.png')} style={{ height: 35, width: 35 }} />
                </TouchableHighlight>
            </View>
            <TouchableHighlight style={styles.but} onPress={openPopup}>
                <Image source={require('./frined_marker_image.png')} style={{ height: 35, width: 35 }} />
            </TouchableHighlight>
            <Button title="console log" onPress={console_friends}>console</Button>
            <PopupPage visible={isPopupVisible} onCloseRequest={closePopup}>
                <Button title="Open Popup" onPress={closePopup}>Открыть</Button>
                <Button title="console log" onPress={console_friends}>console</Button>
                <FriendList acctkn={acctkn} />
            </PopupPage>

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
export default Page;

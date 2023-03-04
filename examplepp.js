import React, { useState } from 'react';
import { View, StyleSheet, Button, SafeAreaView } from 'react-native';
// import { Button } from 'react-native-paper';
import PopupPage from './PopupPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './Loginpage';
import { Modal } from 'react-native-paper';
export const PopupPageExample = () => {

    const [isPopupVisible, setPopupVisible] = useState(false);

    const openPopup = () => {
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    return (
        <SafeAreaProvider>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Open Popup" onPress={openPopup}>Открыть</Button>
                <PopupPage visible={isPopupVisible} onCloseRequest={closePopup}>
                    <LoginScreen />
                </PopupPage>
            </View>
        </SafeAreaProvider>
    );
}

export default PopupPageExample;
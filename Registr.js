import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, Alert, ScrollView, View } from "react-native";
import { gStyle } from './styles/style';
import { Button, TextInput } from "react-native-paper";


export const Registr = ({ navigation }) => {
    const [username, setUsername] = useState('') // 👈
    const [email, setEmail] = useState('') // 👈
    const [password, setPassword] = useState('') // 👈
    const [password_correct, setPassword_correct] = useState('') // 👈
    const ffunc = () => {
        if (password != password_correct) {
            Alert.alert('Пароли не совпадают', 'Ошибка', [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
        } else {
            fetch('http://192.168.1.134:8080/api/v1/auth/registration', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            }).then(response => { if (response.status == '200') { navigation.navigate('LoginScreen'); } else { console.log(response.status) } });
        }
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={gStyle.registrationContent}>
                    <TextInput label='Имя' onChangeText={setUsername} />
                    <TextInput label='Email' keyboardType='email-address' onChangeText={setEmail} />
                    <TextInput
                        label='Пароль'
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        right={
                            <TextInput.Icon icon='eye-off-outline' />
                        }
                    />
                    <TextInput
                        label='Повторите пароль'
                        secureTextEntry={true}
                        onChangeText={setPassword_correct}
                        right={
                            <TextInput.Icon icon='eye-off-outline' />
                        }
                    />
                    <Button title='Регистрация' style={gStyle.registrationButton} onPress={ffunc} >
                        Регистрация
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'purple',
    },
    input: {
        height: 40,
        marginBottom: 10,
        backgroundColor: 'black',
    },
});
export default Registr;
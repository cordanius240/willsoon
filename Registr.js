import React, { useState } from 'react'
import { Button, StyleSheet, TextInput, SafeAreaView, Alert, ScrollView, View } from "react-native";
import { gStyle } from './styles/style';

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
        <SafeAreaView style={styles.body}>
            <ScrollView style={styles.body}>
                <View>
                    <TextInput label='Имя' style={styles.input} onChangeText={setUsername} />
                    <TextInput label='Email' style={styles.input} keyboardType='email-address' onChangeText={setEmail} />
                    <TextInput
                        label='Пароль'
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        label='Повторите пароль'
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={setPassword_correct}
                    />
                    <Button title='Регистрация' onPress={ffunc} />
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
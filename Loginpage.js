import React, { useState } from 'react'
import { StyleSheet, TextInput, Button, View } from 'react-native';
import { gStyle } from './styles/style';
export const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('') // 👈
    const [password, setPassword] = useState('') // 👈
    const ffunc = () => {
        fetch('http://192.168.1.134:8080/api/v1/auth/authenticate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then(response => { if (response.status == '200') { navigation.navigate('MainName'); } else { console.log(response.status) } });
    }
    return (
        <View>
            <TextInput
                label='Логин'
                onChangeText={setEmail}
            />
            <TextInput
                label='Пароль'
                secureTextEntry={true}
                onChangeText={setPassword}
            />
            <Button title='Забыли логин или пароль?' />
            <Button title='Войти' onPress={ffunc} />
            <Button title='Зарегистрироваться' onPress={() => navigation.navigate('Registr')} />
        </View>
    );
}

export default LoginScreen;

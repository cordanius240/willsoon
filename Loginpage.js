import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { gStyle } from './styles/style';
import { Button, Card, Provider as PaperProvider, TextInput } from 'react-native-paper';
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
        <View style={gStyle.loginStyle}>
            <Card style={gStyle.loginCard}>
                <Card.Title title='Скоро буду!' />
                <Card.Content>
                    <TextInput
                        label='Логин'
                        onChangeText={setEmail}
                    />
                    <TextInput
                        label='Пароль'
                        secureTextEntry={true}
                        onChangeText={setPassword}
                    />
                    <Button style={gStyle.loginCardButton}>
                        Забыли логин или пароль?
                    </Button>
                    <Button style={gStyle.loginCardButton} onPress={ffunc} >
                        Войти
                    </Button>
                    <Button style={gStyle.loginCardButton} onPress={() => navigation.navigate('Registr')} >
                        Зарегестрироваться
                    </Button>
                </Card.Content>
            </Card>
        </View >
    );
}

export default LoginScreen;

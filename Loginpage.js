import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { gStyle } from './styles/style';
import { Button, Card, Provider as PaperProvider, TextInput } from 'react-native-paper';

export const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('') // 👈
    const [password, setPassword] = useState('') // 👈
    const [accessToken, setAccessToken] = useState('') // 👈
    const [refreshToken, setRefreshToken] = useState('') // 👈
    const ffunc = async () => {
        const response = await fetch('http://192.168.1.134:8080/api/v1/auth/authenticate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        //}).then(response => response.json().then(data => { setAccessToken(response.accessToken); setRefreshToken(response.refreshToken); }))
        const json_resp = await response.json()
        const status_resp = await response.status
        const accsstkn_resp = json_resp.accessToken
        const rfrshTkn_resp = json_resp.refreshToken
        setAccessToken(accsstkn_resp)
        setRefreshToken(rfrshTkn_resp)
        console.log("json " + accessToken)
        console.log("ststus " + refreshToken)
        if (status_resp == '200') { navigation.navigate('PageName', { acctkn: accsstkn_resp, rfrtkn: rfrshTkn_resp }); }

        //then(response => { if (response.status == '200') { navigation.navigate('MainName'); } else { console.log(response.status) } })\
    }
    const navig = () => {
        if (accessToken != '') { navigation.navigate('PageName', { acctkn: accessToken, rfrtkn: refreshToken }); } else { console.log("'jgf") }
    }
    setTimeout(() => {
        navig();
    }, 10000000000);
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
                    <Button style={gStyle.loginCardButton} onPress={() => navigation.navigate('Registr', { acctkn: accessToken, rfrtkn: refreshToken })} >
                        Зарегестрироваться
                    </Button>
                    <Button style={gStyle.loginCardButton} onPress={() => navigation.navigate('PageName', { acctkn: accessToken, rfrtkn: refreshToken })} >
                        PAGE
                    </Button>
                </Card.Content>
            </Card>
        </View >
    );
}

export default LoginScreen;

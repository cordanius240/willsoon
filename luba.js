import React, { useState } from 'react'
import { FontFamily, Color } from "./GlobalStyles";
import { View, StyleSheet } from "react-native";
import { Image, Text, Pressable, TextInput, Button } from "react-native-paper";

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

    return (
        <View style={styles.login}>
            <Image
                style={styles.loginChild}
                resizeMode="cover"
                source={require("./vector.png")}
            />
            <Text style={[styles.text, styles.textFlexBox, styles.textTypo4]}>
                или войти через
            </Text>
            <View style={styles.parent}>
                <Text style={[styles.text1, styles.textTypo3]}>еще нет аккаунта?</Text>
                <Button style={[styles.text2, styles.ml10, styles.textTypo3]}>
                    регистрация
                </Button>
            </View>
            <Button style={[styles.text3, styles.textTypo2]}>забыли пароль?</Button>
            <Text style={[styles.text4, styles.textTypo1, styles.textFlexBox]}>
                вход
            </Text>
            <View style={[styles.loginInner, styles.frameViewSpaceBlock]}>
                <View style={styles.frameChild} />
            </View>
            <View style={[styles.frameView, styles.frameViewSpaceBlock]}>
                <View style={styles.frameChild} />
            </View>
            <Pressable style={styles.wrapper} onPress={ffunc}>
                <Text style={[styles.text5, styles.text5Position, styles.textTypo1]}>
                    войти
                </Text>
            </Pressable>

            <Pressable
                style={[styles.container, styles.googleLayout, styles.containerLayout]}
            >
                <Text style={styles.textTypo2}>вконтакте</Text>
            </Pressable>

            <Pressable
                style={[
                    styles.googleWrapper,
                    styles.googleLayout,
                    styles.containerLayout,
                ]}

            >
                <Text
                    style={[
                        styles.google,
                        styles.googleLayout,
                        styles.text5Position,
                        styles.textTypo4,
                    ]}
                >
                    google
                </Text>
            </Pressable>

            <TextInput
                style={[styles.text7, styles.textTypo]}
                label="логин"
                onChangeText={setEmail}
            />
            <TextInput
                style={[styles.text8, styles.textTypo]}
                label='пароль'
                secureTextEntry={true}
                onChangeText={setPassword}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    ml10: {
        marginLeft: 10,
    },
    textFlexBox: {
        textAlign: "center",
        letterSpacing: 0,
    },
    textTypo4: {
        fontFamily: FontFamily.interSemibold,
        fontWeight: "600",
        fontSize: 16,
    },
    textTypo3: {
        fontSize: 15,
        textAlign: "center",
        fontFamily: FontFamily.interSemibold,
        fontWeight: "600",
        letterSpacing: 0,
    },
    textTypo2: {
        color: Color.white,
        textAlign: "center",
        fontFamily: FontFamily.interSemibold,
        fontWeight: "600",
        letterSpacing: 0,
        fontSize: 16,
    },
    textTypo1: {
        fontFamily: FontFamily.interExtrabold,
        fontWeight: "800",
        color: Color.white,
        position: "absolute",
    },
    frameViewSpaceBlock: {
        justifyContent: "center",
        paddingVertical: 0,
        paddingHorizontal: 1,
        width: 286,
        left: 45,
        borderRadius: 50,
        position: "absolute",
        backgroundColor: Color.white,
    },
    text5Position: {
        zIndex: 0,
        textAlign: "center",
        letterSpacing: 0,
    },
    googleLayout: {
        width: 139,
        position: "absolute",
    },
    containerLayout: {
        top: 642,
        width: 139,
        height: 40,
        borderRadius: 50,
        alignItems: "center",
    },
    textTypo: {
        left: 80,
        textAlign: "center",
        color: Color.silver,
        fontFamily: FontFamily.interSemibold,
        fontWeight: "600",
        letterSpacing: 0,
        fontSize: 16,
        position: "absolute",
    },
    loginChild: {
        top: 0,
        width: "100%",
        bottom: 100,
        position: "absolute",
    },
    text: {
        top: 598,
        left: 129,
        color: Color.silver,
        position: "absolute",
    },
    text1: {
        color: Color.silver,
    },
    text2: {
        color: "#978efe",
    },
    parent: {
        top: 724,
        left: 68,
        width: 240,
        height: 18,
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
    },
    text3: {
        top: 372,
        left: 125,
        position: "absolute",
    },
    text4: {
        top: 58,
        left: 149,
        fontSize: 32,
    },
    frameChild: {
        width: 283,
        height: 46,
        borderRadius: 50,
        backgroundColor: Color.white,
    },
    loginInner: {
        top: 139,
    },
    frameView: {
        top: 222,
    },
    text5: {
        top: 8,
        left: 63,
        fontSize: 20,
        width: 74,
        height: 24,
    },
    wrapper: {
        top: 312,
        left: 88,
        backgroundColor: "#5247ca",
        width: 200,
        height: 40,
        justifyContent: "center",
        paddingVertical: 0,
        paddingHorizontal: 1,
        borderRadius: 50,
        position: "absolute",
    },
    container: {
        left: 39,
        backgroundColor: "#4f3aed",
        paddingHorizontal: 0,
        paddingVertical: 10,
    },
    google: {
        top: 9,
        color: "#000",
        height: 21,
        left: 0,
    },
    googleWrapper: {
        left: 196,
        backgroundColor: "#f0edf8",
    },
    text7: {
        top: 152,
    },
    text8: {
        top: 235,
    },
    login: {
        flex: 0,
        width: "100%",
        backgroundColor: Color.white,
    },
});
export default LoginScreen;
import React from 'react'
import { StyleSheet } from 'react-native'

export const gStyle = StyleSheet.create({
    /*
    Стили, используемые для тестов всяких элементов страницы
    Удалить потом надо будет
    */
    testButton: {
        margin: 15,
        marginLeft: 0,
        marginRight: 0
    },
    popupTest: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    /*
    Стили, используемые в самих элементах страницы
    Надо делать по человечески
    */
    safeAreaStyle: {
        display: 'flex',
        flex: 1,
    },


    main: {
        fontSize: 20,
        color: 'blue',
        paddingTop: 60
    },
    title: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    },
    map: {
        width: '100%',
        height: '100%'
    },
    loginStyle: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'purple',
    },
    loginCard: {
        width: '80%',
        height: 'auto',
    },
    loginCardButton: {
        margin: 2,
        marginLeft: 0,
        marginRight: 0,
    },
    registrationContent: {
        padding: 15,
        paddingTop: 0,

    },
    registrationButton: {
        margin: 15,
        marginLeft: 0,
        marginRight: 0
    },

})
const styles = StyleSheet.create({
    body: {
        backgroundColor: 'black',
    },
    input: {
        height: 40,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
});
export const theme = {
    colors: {
        primary: 'purple',
        background: 'transparent'
    }
}

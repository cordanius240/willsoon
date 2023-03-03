import React from 'react';
import Main from './Main';
import Page from './Page';
import Denied from './Denied';
import Registr from './Registr';
import LoginScreen from './Loginpage';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name='LoginScreen'
                component={LoginScreen}
                options={{ title: 'Вход' }}
            />
            <Stack.Screen
                name='Registr'
                component={Registr}
                options={{ title: 'Регистрация' }}
            />
            <Stack.Screen
                name='MainName'
                component={Main}
                options={{ title: 'Главная' }}
            />
            <Stack.Screen
                name='PageName'
                component={Page}
                options={{ title: 'Страница' }}
            />
            <Stack.Screen
                name='DeniedName'
                component={Denied}
                options={{ title: 'Страница' }}
            />
        </Stack.Navigator>

    </NavigationContainer>;
}
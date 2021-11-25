import { StatusBar } from 'expo-status-bar';
import React, {useContext, useState} from 'react';
import {Dimensions, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {StackScreens} from "../helpers/typeHelpers";
import {AuthContext} from "../context/AuthContext";

export const LoginForm = (props: { regForm: boolean; }) => {
    const [colorOnFocus, setColorOnFocus] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const authContext = useContext(AuthContext);

    async function onPressFunction() {
        console.log(username, password)
        if (props.regForm) {
            await authContext?.register('Anna', 'Svensson', username, password);
            return
        }
        authContext?.login(username, password);
    }

    return (
        <View style={styles.loginForm}>
        <Text style={styles.textLabel} >Email ID</Text>
    <TextInput placeholder={'email@gmail.com'} onChangeText={setUsername} onFocus={() =>setColorOnFocus("email")} onBlur={() =>setColorOnFocus("")} style={[styles.inputLogin, {borderColor: colorOnFocus === "email" ? '#da1961' : '#686868'}]} />
    <Text style={styles.textLabel} >Password</Text>
        <TextInput placeholder={'******'}  onChangeText={setPassword}  secureTextEntry onFocus={() =>setColorOnFocus("password")} onBlur={() =>setColorOnFocus("")} style={[styles.inputLogin, {borderColor: colorOnFocus === "password" ? '#da1961' : '#686868'}]} />
    <View style={styles.viewLoginButton}>
    <Pressable style={styles.buttonLoginForm} onPress={onPressFunction}>
    <LinearGradient   start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={colors} style={styles.buttonLoginForm}>
    <Text style={styles.textButton}>{props.regForm ? 'Signup' : 'Login'}</Text>
        </LinearGradient>
        </Pressable>
        </View>
        </View>
)
}

interface OnPressFunctionParams {
    screen: any;
}

export const LoginScreen: React.FC<
    NativeStackScreenProps<StackScreens, "LoginScreen">
    > = (props) => {

    const onPressFunction = ({screen}: OnPressFunctionParams) => {
        props.navigation.navigate(screen)
    };

    return (
        <View style={styles.container}>
        <SafeAreaView style={styles.welcome}>
        <Text style={styles.textWelcome}>Welcome,</Text>
        <Text style={styles.textSecond}>Sign in to continue!</Text>
    </SafeAreaView>
            <LoginForm regForm={false}  />
            <Pressable style={styles.buttonLoginForm} onPress={() => onPressFunction({screen : 'RegisterScreen'})}>
            <Text style={styles.newUser}>I'm a new user. SIGN UP</Text>
            </Pressable>
    </View>
);
}

export const colors=['#da1961', '#ffd777']

export const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'auto',
            marginBottom: 'auto',
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: 'white',
            padding: 40,

        },
        loginForm: {
            width: '100%',
        },
        inputLogin: {
            height: 40,
            borderWidth: 1,
            borderColor: '#6c6b6b',
            padding: 10,
            borderRadius: 10,
        },
        welcome: {
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
        },
        buttonLoginForm: {
            width: '100%',
            alignItems:"center",
            justifyContent:"center",
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor:'#ffffff',
        },
        textButton: {
            color: 'white',
            margin: 12,
            fontWeight: 'bold',

        },
        textButtonBlack: {
            color: 'black',
            margin: 12,
            fontWeight: 'bold',

        },
        textLabel: {
            backgroundColor: 'white',
            width: '30%',
            zIndex: 2,
            color: '#585858',
            margin: 3
        },
        textSecond: {
            color: '#a3a3a3',
            fontWeight: 'bold',
            fontSize: 22
        },
        textWelcome: {
            fontSize: 32,
            fontWeight: 'bold',
        },
        newUser: {
            fontWeight: 'bold',
            color: '#494848',

        }, viewLoginButton: {
            marginTop: 15
        },
        viewHomePage: {
            height: '100%',
            backgroundColor: 'white'
    },
        flexRow: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
    },
    viewNewProductPage: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        zIndex: 100
    },


    },
);

import {Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {colors, styles} from "./loginScreen";
import {AuthContext} from "../context/AuthContext";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackScreens} from "../helpers/typeHelpers";
import firebase from "../services/firebaseService";
import SwipeableFlatList from 'react-native-swipeable-list';

function RenderRow(props) {
    return (
        <TouchableOpacity onPress={(e) => props.addNewProduct(props.item)}>
        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', border: '1px solid black', borderRadius: 8, margin: 6, padding: 8, backgroundColor: '#f1f1f1'}}>
            <View style={{ flex: 1, alignSelf: 'stretch', }} ><Text>{props.item.name}</Text></View>
            <View style={{ flex: 1, alignSelf: 'stretch', }} ><Text>{props.item.price}</Text></View>
            <View style={{ flex: 1, alignSelf: 'stretch', }} ><Text>{props.item.type}</Text></View>
        </View>
        </TouchableOpacity>
    );
}

export const HomeScreen: React.FC<
    NativeStackScreenProps<StackScreens, "HomeScreen">
    > = (props) => {
    const [data, setData] = useState([])
    const authContext = useContext(AuthContext);
    const dbRef = firebase.firestore().collection('products')

    function onPressFunction() {
        authContext?.logout();
    }


    useEffect((() => {
        dbRef.onSnapshot((snapshot) => {
                const postData = [];
                snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
                console.log(postData);
                setData(postData)
            });


    }), [])

    const deleteItem = itemId => {
        // ! Please don't do something like this in production. Use proper state management.
        const newState = [...data];
        const filteredState = newState.filter(item => item.id !== itemId);
        setData(filteredState);
        dbRef.doc(itemId).delete();

    };

    function addNewProduct(e) {
        console.log(e)
        props.navigation.navigate('NewProductScreen', {product: e})

    }

    return ( !data ? null :
        <View style={styles.viewHomePage}>


            <SwipeableFlatList
                data={data}
                renderItem={({item}) => (
                    <RenderRow addNewProduct={addNewProduct} item={item} />
                )}
                maxSwipeDistance={240}
                renderQuickActions={({index, item}) => QuickActions(index, item, deleteItem)}
                shouldBounceOnMount={true}
            />

            <Image
                style={{width: '100%', height: 200}}
                source={{uri: 'https://media3.giphy.com/media/wWue0rCDOphOE/giphy.gif'}} />

            <Pressable style={styles.buttonLoginForm} onPress={addNewProduct}>
                <LinearGradient   start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={colors} style={styles.buttonLoginForm}>
                    <Text style={styles.textButton}>+</Text>
                </LinearGradient>
            </Pressable>


            <Pressable style={styles.buttonLoginForm} onPress={onPressFunction}>
                <LinearGradient   start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={colors} style={styles.buttonLoginForm}>
                    <Text style={styles.textButton}>Logout</Text>
                </LinearGradient>
            </Pressable>
        </View>
);
}

const QuickActions = (index, qaItem, deleteItem) => {
    return (
        <View style={styles2.qaContainer}>
            <View style={[styles2.button, styles2.button3]}>
                <Pressable onPress={() => deleteItem(qaItem.id)}>
                    <Text style={[styles2.buttonText, styles2.button3Text]}>Delete</Text>
                </Pressable>
            </View>
        </View>
    );
};

const darkColors = {
    background: '#121212',
    primary: '#BB86FC',
    primary2: '#3700b3',
    secondary: '#03DAC6',
    onBackground: '#FFFFFF',
    error: '#CF6679',
};

const colorEmphasis = {
    high: 0.87,
    medium: 0.6,
    disabled: 0.38,
};

const styles2 = StyleSheet.create({

    container: {
        backgroundColor: '#121212',
    },
    headerContainer: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: '800',
        color: darkColors.onBackground,
        opacity: colorEmphasis.high,
    },
    item: {
        backgroundColor: '#121212',
        height: 80,
        flexDirection: 'row',
        padding: 10,
    },
    messageContainer: {
        backgroundColor: darkColors.backgroundColor,
        maxWidth: 300,
    },
    name: {
        fontSize: 16,
        color: darkColors.primary,
        opacity: colorEmphasis.high,
        fontWeight: '800',
    },
    subject: {
        fontSize: 14,
        color: darkColors.onBackground,
        opacity: colorEmphasis.high,
        fontWeight: 'bold',
        textShadowColor: darkColors.secondary,
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 4,
    },
    text: {
        fontSize: 10,
        color: darkColors.onBackground,
        opacity: colorEmphasis.medium,
    },
    avatar: {
        width: 40,
        height: 40,
        backgroundColor: darkColors.onBackground,
        opacity: colorEmphasis.high,
        borderColor: darkColors.primary,
        borderWidth: 1,
        borderRadius: 20,
        marginRight: 7,
        alignSelf: 'center',
        shadowColor: darkColors.secondary,
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 2,
        shadowOpacity: colorEmphasis.high,
    },
    itemSeparator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: darkColors.onBackground,
        opacity: colorEmphasis.medium,
    },
    qaContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        opacity: colorEmphasis.high,
    },
    button1Text: {
        color: darkColors.primary,
    },
    button2Text: {
        color: darkColors.secondary,
    },
    button3Text: {
        color: darkColors.error,
    },
    contentContainerStyle: {
        flexGrow: 1,
        backgroundColor: darkColors.backgroundColor,
    },
});

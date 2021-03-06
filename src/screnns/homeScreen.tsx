import {Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import React, {SetStateAction, useContext, useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {colors, styles} from "./loginScreen";
import {AuthContext} from "../context/AuthContext";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {item, StackScreens} from "../helpers/typeHelpers";
import firebase from "../services/firebaseService";
import SwipeableFlatList from 'react-native-swipeable-list';
import { FAB } from 'react-native-paper';
import {TransText} from 'react-native-translation'

const columns = {
    name:'Name',
    price: 'Price',
    type: 'Type'
};

const message =  {
    name : {
    "en-SE" : "Name",
    "sv-SE" : "Namn",
    },
    price : {
    "en-SE" : "Price",
    "sv-SE" : "Pris",
    },
    type : {
    "en-SE" : "Type",
    "sv-SE" : "Typ",
    },
    logout : {
    "en-SE" : "Logout",
    "sv-SE" : "Loga ut",
    },
    delete : {
    "en-SE" : "Delete",
    "sv-SE" : "Radera",
    },

}


export const HomeScreen: React.FC<
    NativeStackScreenProps<StackScreens, "HomeScreen">
    > = (props: React.PropsWithChildren<any>) => {
    const [data, setData] = useState<item[] >([]);
    const authContext = useContext(AuthContext);
    const dbRef = firebase.firestore().collection('products')

    function onPressFunction() {
        authContext?.logout();
    }


    useEffect(() => {
        dbRef.onSnapshot((snapshot) => {
            const postData: item[] = [];
            snapshot.forEach((doc) => postData?.push({name: "", price: 0, type: "", ...doc.data(), id: doc.id }));
            setData(postData)
            });


    }, [])

    const deleteItem = (itemId: string | undefined   ) => {
        let newState:  item[]  = data;
        newState = newState?.filter((item: item) => item.id !== itemId);
        setData(newState);
        dbRef.doc(itemId).delete();
    };

    function addNewProduct(e: item | null) {
        console.log(e)
        props.navigation.navigate('NewProductScreen', {product: e, data: data})

    }

    function RenderRow(props: { addNewProduct: (arg0: item | null) => void; item: item }) {
        console.log(props)
        return (
            <TouchableOpacity onPress={(e) => props.addNewProduct(props.item)}>
                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', borderWidth: 1, borderColor: 'black', borderStyle: 'solid', borderRadius: 8, margin: 6, padding: 8, backgroundColor: '#f1f1f1'}}>
                    <View style={{ flex: 1, alignSelf: 'stretch', }} ><Text>{props.item.name}</Text></View>
                    <View style={{ flex: 1, alignSelf: 'stretch', }} ><Text>{props.item.price}</Text></View>
                    <View style={{ flex: 1, alignSelf: 'stretch', }} ><Text>{props.item.type}</Text></View>
                </View>
            </TouchableOpacity>
        );
    }

    return ( !data && columns ? null :
        <SafeAreaView style={styles.viewHomePage}>

            <View style={{ flex: 1, alignSelf: 'stretch', maxHeight: 34, flexDirection: 'row', borderWidth: 1, borderColor: 'black', borderStyle: 'solid',  borderRadius: 8, margin: 6, padding: 8, backgroundColor: colors[1]}}>
                <View style={{ flex: 1, alignSelf: 'stretch', }} >
                    <TransText dictionary = {message.name}/>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', }} >
                    <TransText dictionary = {message.price}/>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', }} >
                    <TransText dictionary = {message.type}/>
                </View>
            </View>

            <SwipeableFlatList
                data={data}
                renderItem={(x: { item: item; }) => (
                    <RenderRow addNewProduct={(item) => addNewProduct(item)} item={x?.item} />
                )}
                maxSwipeDistance={240}
                renderQuickActions={(index: number, item: item) => QuickActions(index, item, deleteItem)}
                shouldBounceOnMount={true}
            />

            <Image
                style={{width: '100%', height: 200}}
                source={{uri: 'https://media3.giphy.com/media/wWue0rCDOphOE/giphy.gif'}} />

            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => addNewProduct(null)}
            />

            <Pressable style={styles.buttonLoginForm} onPress={onPressFunction}>
                <LinearGradient   start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={colors} style={styles.buttonLoginForm}>
                    <TransText style={styles.textButton} dictionary = {message.logout}/>
                </LinearGradient>
            </Pressable>
        </SafeAreaView>
);
}

const QuickActions = (index: number, qaItem: item, deleteItem: { (itemId: string |undefined): void; (arg0: string): void; }) => {
    return (
        <View style={styles2.qaContainer}>
            <View style={[styles2.button, styles2.button]}>
                <Pressable onPress={() => deleteItem(qaItem?.id || '')}>
                    <TransText style={styles2.buttonText} dictionary = {message.delete}/>
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
    },
});

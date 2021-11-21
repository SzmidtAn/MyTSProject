import React, {useContext, useEffect, useState} from "react";
import {Button, Picker, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {colors, styles} from "./loginScreen";
import {LinearGradient} from "expo-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import firebase from "../services/firebaseService";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackScreens} from "../helpers/typeHelpers";

type Inputs = {
    example: string,
    exampleRequired: string,
    name: string,
    type: string,
};

export const NewProductScreen: React.FC<
    NativeStackScreenProps<StackScreens, "HomeScreen">
    > = (props) => {
    const [disabledSaveButton, setDisabledSaveButton] = useState(false)
    const [item, setItem] = useState()
    const dbRef = firebase.firestore().collection('products');
    const { control, handleSubmit, reset, formState: { errors } } = useForm({});

    const onSubmit = (data) => {
        if(item){
            updateItem(item.id, data)
            return
        }
        addItem(data)
    };

    useEffect(() => {
        const product = props.route.params.product
        console.log(product)
        if(product){
            setItem(product)
            reset(product);
        }

    }, [])

    function deleteItem(id){

    }

    function updateItem(id, data){
        console.log(id, data)
        dbRef.doc(id).update(data)
            .then((res) => {
                props.navigation.navigate('HomeScreen')
            })
            .catch((err) => {
                console.error("Error found: ", err);
            });
    }

    function addItem(data){
        console.log(data)
        dbRef.add(data).then((res) => {
            props.navigation.navigate('HomeScreen')
        })
            .catch((err) => {
                console.error("Error found: ", err);
            });
    }


    function onPressFunctionCancel() {
        props.navigation.goBack()
    }

    return (
        <View style={styles.viewHomePage}>

                <Text style={styles.textLabel} >Name</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.inputLogin}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="name"
                />
                {errors.name && <Text>This is required.</Text>}

                <Text style={styles.textLabel} >Price</Text>
                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                        type: 'numeric'
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.inputLogin}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType='numeric'
                        />
                    )}
                    name="price"
                />
            {errors.price  && <Text>Only numbers.</Text>}

                <Text style={styles.textLabel} >Product type</Text>
                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Picker
                            style={styles.inputLogin}
                            onValueChange={onChange}
                            selectedValue={value}
                        >
                            <Picker.Item label="Peripheral" value="Peripheral" />
                            <Picker.Item label="Integrated" value="Integrated" />
                        </Picker>
                    )}
                    name="type"
                />

                <View style={styles.flexRow}>
                <Pressable disabled={disabledSaveButton} style={{...styles.buttonLoginForm, width: '50%'}}  onPress={handleSubmit(onSubmit)} >
                    <LinearGradient   start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={colors} style={styles.buttonLoginForm}>
                        <Text style={styles.textButton}>Save</Text>
                    </LinearGradient>
                </Pressable>

            <Pressable style={{...styles.buttonLoginForm, width: '50%', borderStyle: 'solid', borderColor: 'black', borderWidth: 1}}   onPress={onPressFunctionCancel}>
                    <Text style={styles.textButtonBlack}>Cancel</Text>
            </Pressable>
                </View>

        </View>
    );
}

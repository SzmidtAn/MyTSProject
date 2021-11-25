// noinspection TypeScriptValidateTypes

import React, {useContext, useEffect, useState} from "react";
import {Button, Picker, Pressable, SafeAreaView, ScrollView, Text, TextInput, View} from "react-native";
import {colors, styles} from "./loginScreen";
import {LinearGradient} from "expo-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import firebase from "../services/firebaseService";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackScreens} from "../helpers/typeHelpers";
import { Feather } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

type Inputs = {
    example: string,
    exampleRequired: string,
    name: string,
    type: string,
};


interface item {
    name: string,
    type: string,
    price: number,
    id:  string
}

export const NewProductScreen: React.FC<
    NativeStackScreenProps<StackScreens, "HomeScreen">
    > = (props) => {
    const [item, setItem] = useState<item | null>()
    const dbRef = firebase.firestore().collection('products');
    const { control, handleSubmit, reset, getValues, watch,  formState: {errors, isValid} } = useForm({
        defaultValues: {
            name:'',
            price: '',
            type: 'Peripheral'
        },
        mode: "onChange"

    });


    const onSubmit = (data: any) => {
        const product: item | null | any = props?.route?.params?.data

        console.log(product)
        console.log(product)
        if(product.find((e: { name: string; }) => e.name === data.name)){
            return
        }

        if(data.type === 'Integrated' && (data.price < 1000 || data.price > 2600)){
            return
        }

        if(item){
            updateItem(item.id, data)
            return
        }

        addItem(data)
    };


    useEffect(() => {
        const product: item | null | any = props?.route?.params?.product
        if(product){
            setItem(product)
            reset(product);
        }

    }, [])


    function updateItem(id: string , data: object){
        dbRef.doc(id).update(data)
            .then((res) => {
                props.navigation.navigate('HomeScreen')
            })
            .catch((err) => {
                console.error("Error found: ", err);
            });
    }

    function addItem(data: object){


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

    const allowOnlyNumber=(value)=>{
        if(!value){
            return
        }

        return value?.replace(/[^0-9]/g, '')
    }

    return (
        <SafeAreaView style={styles.viewNewProductPage}>
            <View >
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

                <Text style={styles.textLabel} >Price</Text>
                <Controller
                    control={control}
                    rules={{
                        min: 0,
                        max: 2600,
                        required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.inputLogin}
                            onBlur={onBlur}
                            onChangeText={(text)=>onChange(allowOnlyNumber(text))}
                            value={value}
                            keyboardType='numeric'
                        />
                    )}
                    name="price"
                />

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
            </View>


            <View style={styles.flexRow}>
                <Pressable  disabled={!isValid} style={{...styles.buttonLoginForm, width: '50%', borderStyle: 'solid', borderColor: 'black', borderWidth: 1}}   onPress={onPressFunctionCancel}>
                <Button style={{...styles.buttonLoginForm, width: '50%'}} disabled={!isValid} title={'Spara'}  onPress={handleSubmit(onSubmit)}/>
                    <Feather name="download" size={24} color="black" />
                </Pressable>

                <Pressable style={{...styles.buttonLoginForm, width: '50%', borderStyle: 'solid', borderColor: 'black', borderWidth: 1}}   onPress={onPressFunctionCancel}>
                    <View style={styles.flexRow}>
                        <Text style={styles.textButtonBlack}>Cancel</Text>
                        <Foundation name="prohibited" size={24} color={colors[0]} />
                    </View>
                </Pressable>
            </View>

        </SafeAreaView>
    );
}

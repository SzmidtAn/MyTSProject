import {SafeAreaView, Text, View} from "react-native";
import React from "react";
import {LoginForm} from "./loginScreen";

export default function RegisterScreen() {
    return (
        <View >
        <LoginForm regForm={true} />
        </View>
    );
}

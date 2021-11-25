import { StatusBar } from 'expo-status-bar';
import React, {useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {AuthContext, AuthContextProvider} from "./src/context/AuthContext";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StackScreens} from "./src/helpers/typeHelpers";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "./src/screnns/registerScreen";
import {HomeScreen} from "./src/screnns/homeScreen";
import {LoginScreen} from "./src/screnns/loginScreen";
import {NewProductScreen} from "./src/screnns/newProductScreen";
import {LanguageProvider} from "react-native-translation";
const locale = Localization.locale
import * as Localization from 'expo-localization';

export const MainNavigator = () => {
    const StackNavigator = createNativeStackNavigator<StackScreens>();
    const authContext = useContext(AuthContext);
    return (
        <NavigationContainer>
            <StackNavigator.Navigator>
                {!authContext?.isUserSignedIn && (
                    <>
                        <StackNavigator.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
                        <StackNavigator.Screen
                            name="RegisterScreen"
                            component={RegisterScreen}
                        />
                    </>
                )}
                {authContext?.isUserSignedIn && (
                    <>
                    <StackNavigator.Screen options={{headerShown: false}} name="HomeScreen" component={HomeScreen} />
                    <StackNavigator.Screen options={{title: 'Products details'}} name="NewProductScreen" component={NewProductScreen} />
                    </>
                )}
            </StackNavigator.Navigator>
        </NavigationContainer>
    );
};

export default function App() {
    console.log(locale)
  return (
      <LanguageProvider language={locale}>
      <AuthContextProvider>
        <MainNavigator  />
      </AuthContextProvider>
      </LanguageProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

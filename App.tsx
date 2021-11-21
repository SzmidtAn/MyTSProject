import { StatusBar } from 'expo-status-bar';
import React, {useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {AuthContext, AuthContextProvider} from "./src/context/AuthContext";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StackScreens} from "./src/helpers/typeHelpers";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "./src/screnns/registerScreen";
import {NewProductScreen} from "./src/screnns/NewProductScreen";
import {HomeScreen} from "./src/screnns/homeScreen";
import {LoginScreen} from "./src/screnns/loginScreen";

export const MainNavigator = () => {
    const StackNavigator = createNativeStackNavigator<StackScreens>();
    const authContext = useContext(AuthContext);
    return (
        <NavigationContainer>
            <StackNavigator.Navigator>
                {!authContext?.isUserSignedIn && (
                    <>
                        <StackNavigator.Screen name="LoginScreen" component={LoginScreen} />
                        <StackNavigator.Screen
                            name="RegisterScreen"
                            component={RegisterScreen}
                        />
                    </>
                )}
                {authContext?.isUserSignedIn && (
                    <>
                    <StackNavigator.Screen name="HomeScreen" component={HomeScreen} />
                    <StackNavigator.Screen name="NewProductScreen" component={NewProductScreen} />
                    </>
                )}
            </StackNavigator.Navigator>
        </NavigationContainer>
    );
};

export default function App() {
  return (
      <AuthContextProvider>
        <MainNavigator  />
      </AuthContextProvider>
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

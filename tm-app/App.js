import React, { useState, useContext } from "react";
import { AsyncStorage } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import TipoScreen from "./screens/TipoScreen";
import MontadoraScreen from "./screens/MontadoraScreen";
import DetalhesScreen from "./screens/DetalhesScreen";
import ExpandidoScreen from "./screens/ExpandidoScreen";

import Colors from "./constants/colors"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.header
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            textTransform: "capitalize"
          }
        }}
      >
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ title: "Tecnomotor" }}
        />
        <Stack.Screen
          name="selTipo"
          component={TipoScreen}
          options={{ title: "Tecnomotor" }}
        />
        <Stack.Screen
          name="selMontadora"
          component={MontadoraScreen}
          options={({ route }) => ({
            title: route.params.tipo
          })}
        />
        <Stack.Screen
          name="detalhes"
          component={DetalhesScreen}
          options={({ route }) => ({
            title: route.params.montadora
          })}
        />
        <Stack.Screen
          name="expandido"
          component={ExpandidoScreen}
          options={({ route }) => ({
            title: route.params.dados.veiculo.nome
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

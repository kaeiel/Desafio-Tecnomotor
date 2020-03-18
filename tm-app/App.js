import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TipoScreen from "./screens/TipoScreen";
import MontadoraScreen from "./screens/MontadoraScreen";
import DetalhesScreen from "./screens/DetalhesScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            textTransform: "capitalize"
          }
        }}
      >
        <Stack.Screen
          name="selTipo"
          component={TipoScreen}
          options={{ title: "TECNOMOTOR" }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

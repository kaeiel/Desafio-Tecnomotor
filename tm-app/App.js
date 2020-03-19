import React, { useState, useEffect } from "react";
import { AsyncStorage, ActivityIndicator, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import TipoScreen from "./screens/TipoScreen";
import MontadoraScreen from "./screens/MontadoraScreen";
import DetalhesScreen from "./screens/DetalhesScreen";
import ExpandidoScreen from "./screens/ExpandidoScreen";

import Colors from "./constants/colors";
import { NAVIGATION_KEY } from "./constants/persistenceKeys";

const Stack = createStackNavigator();

export default function App() {
  const [tudoPronto, setTudoPronto] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(NAVIGATION_KEY);
        const state = JSON.parse(savedStateString);

        setInitialState(state);
      } finally {
        setTudoPronto(true);
      }
    };

    if (!tudoPronto) {
      restoreState();
    }
  }, [tudoPronto]);

  if (!tudoPronto) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={state =>
        AsyncStorage.setItem(NAVIGATION_KEY, JSON.stringify(state))
      }
    >
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

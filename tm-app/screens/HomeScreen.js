import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  FlatList,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

import ItemLista from "../components/ItemLista";
import Colors from "../constants/colors";
import { SAVEDITEM_KEY } from "../constants/persistenceKeys";

const HomeScreen = ({ navigation }) => {
  const [tudoPronto, setTudoPronto] = useState(false);
  const [itemSalvo, setItemSalvo] = useState(null);
  // const [itemPronto, setItemPronto] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("selTipo")}
            title="Adicionar"
            color={Colors.button}
          />
        </View>
      )
    });
  }, [navigation]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      if (!tudoPronto) {
        setTimeout(() => {
          recItensSalvos();
        }, 500);
      }
    });
    return () => {};
  }, [navigation, tudoPronto]);

  const recItensSalvos = async () => {
    try {
      const savedItemString = await AsyncStorage.getItem(SAVEDITEM_KEY);
      const savedItem = JSON.parse(savedItemString);
      if (savedItem !== null) {
        setItemSalvo(savedItem);
      } else {
        setItemSalvo(null);
      }
    } finally {
      setTudoPronto(true);
    }
  };

  const buttonHandler = () => {
    AsyncStorage.removeItem(SAVEDITEM_KEY);
    setItemSalvo(null);
  };

  if (!tudoPronto) {
    return (
      <View style={{ ...styles.screen, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!itemSalvo) {
    return <View style={styles.screen}></View>;
  } else {
    return (
      <View style={styles.screen}>
        <View style={styles.listContainer}>
          <ItemLista id={itemSalvo.id} onSelect={() => {}}>
            <Text style={styles.texto}>
              Montadora: {itemSalvo.montadora.nome}
            </Text>
            <Text style={styles.texto}>Veículo: {itemSalvo.veiculo.nome}</Text>
            <Text style={styles.texto}>
              Motorização: {itemSalvo.motorizacao.nome}
            </Text>
            <Text style={styles.texto}>Sistema: {itemSalvo.sistema.nome}</Text>
          </ItemLista>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={buttonHandler}
            title="Limpar"
            color={Colors.perigo}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  texto: {
    fontSize: 15
  },
  listContainer: {
    width: "100%"
  },
  buttonContainer: {
    width: 110,
    marginRight: 10
  }
});

export default HomeScreen;

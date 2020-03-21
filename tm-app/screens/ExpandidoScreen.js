import React, { useReducer } from "react";
import { StyleSheet, View, Text, Button, AsyncStorage } from "react-native";

import ItemLista from "../components/ItemLista";
import { SAVEDITEM_KEY } from "../constants/persistenceKeys";
import Colors from "../constants/colors"

const ExpandidoScreen = ({ navigation, route }) => {
  const { dados } = route.params;

  const addButtonHandler = item => {
    AsyncStorage.removeItem(SAVEDITEM_KEY);
    setTimeout(
      () => AsyncStorage.setItem(SAVEDITEM_KEY, JSON.stringify(item)),
      10
    );
    navigation.popToTop();
  };
  return (
    <View style={styles.screen}>
      <View style={styles.listContainer}>
        <ItemLista id={dados.id} onSelect={() => {}}>
          <Text style={styles.texto}>Montadora: {dados.montadora.nome}</Text>
          <Text style={styles.texto}>Veículo: {dados.veiculo.nome}</Text>
          <Text style={styles.texto}>
            Motorização: {dados.motorizacao.nome}
          </Text>
          <Text style={styles.texto}>Sistema: {dados.sistema.nome}</Text>
        </ItemLista>
        <View>
          <Button
            title="Adicionar"
            onPress={() => addButtonHandler(dados)}
            color={Colors.button}
          />
        </View>
      </View>
    </View>
  );
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
    fontSize: 15,
    textTransform: "capitalize"
  },
  listContainer: {
    width: "100%"
  }
});

export default ExpandidoScreen;

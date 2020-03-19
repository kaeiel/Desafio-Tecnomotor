import React, { useReducer } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";

import ItemLista from "../components/ItemLista";

const ExpandidoScreen = ({ navigation, route }) => {
  const { dados } = route.params;

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
            onPress={() => {}}
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

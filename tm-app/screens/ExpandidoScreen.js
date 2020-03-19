import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import ItemLista from "../components/ItemLista";

const ExpandidoScreen = ({ navigation, route }) => {
  const { dadosAPI } = route.params;
  const content = dados => {
    const textConstructor = (nome, checkVar) => {
      if (typeof checkVar !== "undefined" && checkVar !== null && checkVar !== "") {
        return (
          <Text style={styles.texto}>
            {nome}: {checkVar}
          </Text>
        );
      } else {
        return;
      }
    };
    return (
      <View>
        {textConstructor("Montadora", dados.montadora.nome)}
        {textConstructor("Veículo", dados.veiculo.nome)}
        {textConstructor("Motorização", dados.motorizacao.nome)}
        {textConstructor("Sistema", dados.sistema.nome)}
        {textConstructor("Ano inicial", dados.anoInicial)}
        {textConstructor("Ano Final", dados.anoFinal)}
      </View>
    );
  };
  return (
    <View style={styles.screen}>
      <View style={styles.listContainer}>
        <ItemLista id={dadosAPI.id} onSelect={() => {}}>
          {content(dadosAPI)}
        </ItemLista>
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

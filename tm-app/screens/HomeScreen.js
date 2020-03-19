import React, { useLayoutEffect } from "react";
import { StyleSheet, View, Button, Text, FlatList } from "react-native";

import ItemLista from "../components/ItemLista";
import Colors from "../constants/colors"

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("selTipo")}
          title="Adicionar"
          color = {Colors.button}
        />
      )
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      {/* <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={lista}
          renderItem={itemData => (
            <ItemLista id={itemData.item.id} onSelect={() => {}}>
              <Text style={styles.texto}>
                Montadora: {itemData.item.montadora.nome}
              </Text>
              <Text style={styles.texto}>
                Veículo: {itemData.item.veiculo.nome}
              </Text>
              <Text style={styles.texto}>
                Motorização: {itemData.item.motorizacao.nome}
              </Text>
              <Text style={styles.texto}>
                Sistema: {itemData.item.sistema.nome}
              </Text>
            </ItemLista>
          )}
        />
      </View> */}
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
    fontSize: 15
  },
  listContainer: {
    width: "100%"
  },
  buttonContainer: {
    width: 110
  }
});

export default HomeScreen;

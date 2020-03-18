import React, { useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";

import ItemLista from "../components/ItemLista";

// Requisição GET para a API retornando uma promessa de objeto JSON
const apiGetMontadoras = tipo => {
  let respMontadoras = fetch(
    `https://service.tecnomotor.com.br/iRasther/montadora?pm.type=${tipo}`
  ).then(resp => resp.json());
  return respMontadoras;
};

const MontadoraScreen = ({ navigation, route }) => {
  const { tipo } = route.params;
  // State hooks
  const [montadoras, setMontadoras] = useState([]);
  const [gotMontadoras, setGotMontadoras] = useState(false);

  // Se a requisição falhou ou ainda não aconteceu, então uma nova requisição ocorre
  // Se a resolução da promessa ocorre sem erros, o estado 'montadoras' é atualizado
  if (!gotMontadoras) {
    setGotMontadoras(true);
    apiGetMontadoras(tipo)
      .then(response => {
        response.forEach(resp => {
          setMontadoras(montadorasAtuais => {
            return [...montadorasAtuais, { ...resp, id: resp.id.toString() }];
          });
        });
      })
      .catch(err => {
        setGotMontadoras(false);
        console.error(`[ERRO] API GET Montadoras - ${err}`);
      });
  }

  const selMontadoraHandler = montadoraId => {
    let montadoraSelecionada = montadoras.filter(
      montadora => montadora.id === montadoraId
    )[0];
    navigation.navigate("detalhes", {
      idMontadora: montadoraSelecionada.id,
      montadora: montadoraSelecionada.nome,
      tipo: montadoraSelecionada.tipo
    });
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Selecione uma montadora</Text>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={montadoras}
          renderItem={itemData => (
            <ItemLista id={itemData.item.id} onSelect={selMontadoraHandler}>
              <Text style={{ fontSize: 15 }}>{itemData.item.nome}</Text>
            </ItemLista>
          )}
        />
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
  listContainer: {
    width: "100%"
  }
});

export default MontadoraScreen;

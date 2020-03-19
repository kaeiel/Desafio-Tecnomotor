import React, { useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";

import ItemLista from "../components/ItemLista";

// Requisição GET para a API retornando uma promessa de objeto JSON
const apiGeDetalhes = (tipo, idMontadora) => {
  let respDetalhes = fetch(
    `https://service.tecnomotor.com.br/iRasther/aplicacao?pm.platform=1&pm.version=17&pm.type=${tipo}&pm.assemblers=${idMontadora}&pm.pageIndex=0&pm.pageSize=10`
  ).then(resp => resp.json());
  return respDetalhes;
};

const DetalhesScreen = ({ navigation, route }) => {
  const { tipo } = route.params;
  const { idMontadora } = route.params;
  // State hooks
  const [detalhes, setDetalhes] = useState([]);
  const [gotDetalhes, setGotDetalhes] = useState(false);

  // Se a requisição falhou ou ainda não aconteceu, então uma nova requisição ocorre
  // Se a resolução da promessa ocorre sem erros, o estado 'detalhes' é atualizado
  if (!gotDetalhes) {
    setGotDetalhes(true);
    apiGeDetalhes(tipo, idMontadora)
      .then(response => response[Object.keys(response)])
      .then(response =>
        response.forEach(resp => {
          setDetalhes(detalhesAtuais => {
            return [
              ...detalhesAtuais,
              {
                veiculo: { nome: "" },
                motorizacao: { nome: "" },
                sistema: { nome: "" },
                ...resp,
                id: resp.id.toString()
              }
            ];
          });
        })
      )
      .catch(err => {
        setGotDetalhes(false);
        console.error(`[ERRO] API GET Detalhes - ${err}`);
      });
  }

  const selDetalheHandler = detalheId => {
    let detalheSelecionado = detalhes.filter(
      detalhe => detalhe.id === detalheId
    )[0];
    navigation.navigate("expandido", {
      dadosAPI: detalheSelecionado
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={detalhes}
          renderItem={itemData => (
            <ItemLista id={itemData.item.id} onSelect={selDetalheHandler}>
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
    fontSize: 15
  },
  listContainer: {
    width: "100%"
  }
});

export default DetalhesScreen;

import React, { useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";

import ItemLista from "../components/ItemLista";

// Gerador de UUID
const uuid = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
};

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
  return (
    <View style={styles.screen}>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={detalhes}
          renderItem={itemData => (
            <ItemLista id={itemData.item.id} onSelect={() => {}}>
              <Text style={{ fontSize: 15 }}>
                Veículo: {itemData.item.veiculo.nome}
              </Text>
              <Text style={{ fontSize: 15 }}>
                Motorização: {itemData.item.motorizacao.nome}
              </Text>
              <Text style={{ fontSize: 15 }}>
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
  listContainer: {
    width: "100%"
  }
});

export default DetalhesScreen;

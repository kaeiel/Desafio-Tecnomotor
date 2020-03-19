import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator
} from "react-native";

import ItemLista from "../components/ItemLista";

// // Requisição GET para a API retornando uma promessa de objeto JSON
// const apiGetTipos = () => {
//   let respTipos = fetch(
//     "https://service.tecnomotor.com.br/iRasther/tipo"
//   ).then(resp => resp.json());
//   return respTipos;
// };

const TipoScreen = ({ navigation }) => {
  // State hooks
  const [tipos, setTipos] = useState([]);
  const [tudoPronto, setTudoPronto] = useState(false);

  useEffect(() => {
    const apiGetTipos = async () => {
      try {
        const respTipos = await fetch(
          "https://service.tecnomotor.com.br/iRasther/tipo"
        )
          .then(resp => resp.json())
          .then(resp =>
            resp.map(r => {
              return { id: Math.random().toString(), tipo: r };
            })
          )
          .catch(err => {
            setTudoPronto(false);
            console.error(`[ERRO] API GET Tipos - ${err}`);
          });
        setTipos(respTipos);
      } finally {
        setTudoPronto(true);
      }
    };

    if (!tudoPronto) {
      apiGetTipos();
    }
  }, [tudoPronto]);

  if (!tudoPronto) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Selecione um tipo</Text>
        <ActivityIndicator />
      </View>
    );
  }

  // // Se a requisição falhou ou ainda não aconteceu, então uma nova requisição ocorre
  // // Se a resolução da promessa ocorre sem erros, o estado 'tipos' é atualizado
  // if (!gotTipos) {
  //   setGotTipos(true);
  //   apiGetTipos()
  //     .then(resp => {
  //       resp.forEach(r => {
  //         setTipos(tiposAtuais => {
  //           return [
  //             ...tiposAtuais,
  //             {
  //               id: Math.random().toString(),
  //               tipo: r
  //             }
  //           ];
  //         });
  //       });
  //     })
  //     .catch(err => {
  //       setGotTipos(false);
  //       console.error(`[ERRO] API GET Tipos - ${err}`);
  //     });
  // }

  const selTipoHandler = tipoId => {
    const tipoSelecionado = tipos.filter(tipo => tipo.id === tipoId)[0];
    navigation.navigate("selMontadora", { tipo: tipoSelecionado.tipo });
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Selecione um tipo</Text>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={tipos}
          renderItem={itemData => (
            <ItemLista id={itemData.item.id} onSelect={selTipoHandler}>
              <Text style={styles.texto}>{itemData.item.tipo}</Text>
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

export default TipoScreen;

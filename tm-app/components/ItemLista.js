import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/colors";

const ItemLista = props => {
  return (
    <TouchableOpacity onPress={props.onSelect.bind(this, props.id)}>
      <View style={styles.item}>{props.children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: "1%",
    borderColor: Colors.borderColorLista,
    borderWidth: 1,
    backgroundColor: "#00000000",
    width: "100%"
  }
});

export default ItemLista;

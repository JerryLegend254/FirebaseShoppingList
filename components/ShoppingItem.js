import React from 'react';
import { Text, View, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const ShoppingItem = ({item}) => {

    return (
      <View style={styles.itemView}>
        <View style={styles.startView}>
          <Pressable>
            <View style={styles.checkView}></View>
          </Pressable>
          <Text style={styles.itemText}>{item}</Text>
        </View>
        <Pressable>
          <MaterialIcons name="delete" size={30} color="black" />
        </Pressable>
      </View>
    );
}

const styles = StyleSheet.create({
  itemView: {
    backgroundColor: "#dda15e",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: "90%",
    borderRadius: 5,
    paddingVertical: 8,
    padding: 10,
    marginVertical: 8,
  },
  checkView: {
    width: 20,
    height: 20,
      backgroundColor: "#bc6c25",
      borderRadius: 5,
    marginRight: 30,
    },
    startView: {
        flexDirection: "row",
    },
    itemText: {
        fontSize: 20,
        fontWeight: 600
    }
});
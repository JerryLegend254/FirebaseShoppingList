import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { db,doc, updateDoc, deleteDoc} from "../firebase/index";



export const ShoppingItem = ({ title, isChecked, id, getItems}) => {
  const [Checked, setIsChecked] = useState(isChecked);
  
  const updateChecked = async () => {
    try {
      const shoppingRef = doc(db, "shopping", id);

      // Set the "capital" field of the city 'DC'
      await updateDoc(shoppingRef, {
        isChecked: Checked,
      });
    } catch (e) {
      console.log("Error", e)
    }
  }

  const deleteItem = async () => {
    await deleteDoc(doc(db, "shopping", id));
    getItems();
  }

  useEffect(() => {
    updateChecked()
  }, [Checked])
    return (
      <View style={styles.itemView}>
        <View style={styles.startView}>
          <Pressable onPress={() => setIsChecked(!Checked)}>
            <View style={styles.checkView}>
              {!Checked ? (
                <AntDesign name="checkcircleo" size={24} color="black" />
              ) : (
                <AntDesign name="checkcircle" size={24} color="black" />
              )}
            </View>
          </Pressable>
          <Text style={styles.itemText}>{title}</Text>
        </View>
        <Pressable onPress={deleteItem}>
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
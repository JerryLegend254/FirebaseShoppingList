import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { ShoppingItem } from "./components/ShoppingItem";
import {
  doc,
  app,
  db,
  collection,
  addDoc,
  getFirestore,
  getDocs,
  deleteDoc
} from "./firebase/index";

export default function App() {
  const [title, setTitle] = useState("");
  const [itemList, setItemList] = useState([]);

  const addShoppingItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        title,
        isChecked: false,
      });
      setTitle("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    Keyboard.dismiss();
    getShoppingItems();
  };

  const getShoppingItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "shopping"));
      setItemList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    } catch (e) {
      console.log("Error: ", e)
    }
  };
  
  const deleteShoppingList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "shopping"));
      querySnapshot.docs.map(item => deleteDoc(doc(db, "shopping", item.id)));
      getShoppingItems();
    } catch (e) {
      console.log("Error: ", e)
    }
  }

  useEffect(() => {
    getShoppingItems();

  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.shoppingTitleView}>
        <Text style={styles.shoppingTitle}>Shopping list</Text>
        <View style={styles.endView}>
          <Text style={styles.noItems}>{itemList.length}</Text>
          <Pressable onPress={deleteShoppingList}>
            <MaterialIcons name="delete" size={30} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={styles.itemContainer}>
        {itemList.length > 0 ? <FlatList
          data={itemList}
          renderItem={({ item }) => <ShoppingItem title={item.title} isChecked={item.isChecked} id={item.id} getItems={getShoppingItems} />}
            keyExtractor={(item) => item.id}
        /> : <ActivityIndicator size={100} style={{position: "absolute", top: "30%", left: "35%"}} />}

          
        
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.addItemView}
      >
        <TextInput
          style={styles.input}
          placeholder="Add Item to Shopping List"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TouchableOpacity onPress={addShoppingItem}>
          <View style={styles.addItemBtn}>
            <Text style={{ fontSize: 16 }}>Add Item</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d5bdaf",
  },
  shoppingTitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "90%",
    padding: 10,
  },
  shoppingTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  endView: {
    flexDirection: "row",
  },
  noItems: {
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 20,
  },
  itemContainer: {
    flex: 1,
  },
  input: {
    backgroundColor: "#dda15e",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 50,
    width: "60%",
  },
  addItemView: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  addItemBtn: {
    height: 50,
    width: 100,
    backgroundColor: "#bc6c25",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

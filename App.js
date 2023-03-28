import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Pressable, KeyboardAvoidingView, TextInput, Platform, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

import { ShoppingItem } from './components/ShoppingItem';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.shoppingTitleView}>
        <Text style={styles.shoppingTitle}>Shopping list</Text>
        <View style={styles.endView}>
          <Text style={styles.noItems}>2</Text>
          <Pressable>
            <MaterialIcons name="delete" size={30} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <ShoppingItem item="Bread" />
        <ShoppingItem item="Teabags" />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        style={styles.addItemView}
      >
        <TextInput style={styles.input} placeholder="Add Item to Shopping List" />
        <TouchableOpacity><View style={styles.addItemBtn}><Text style={{fontSize: 16}}>Add Item</Text></View></TouchableOpacity>
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
  itemContainer: {},
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

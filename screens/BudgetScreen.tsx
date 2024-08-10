/** @format */

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colorTheme, formatCurrency } from "../src/helper";
import { TextInput } from "react-native-paper";
import DropdownComponent from "../components/Drpdown";

export default function BudgetScreen() {
  const [totalAmount, setTotalAmount] = useState(10000); // Hardcoded amount to split
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const handleAdd = () => {
    alert("tes");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerAccount}>
        <Text style={styles.accountLabel}>Account Balance</Text>
        <Text style={styles.money}>{formatCurrency(totalAmount)}</Text>
      </View>

      <View style={styles.inputsWrapper}>
        <DropdownComponent />
        <TextInput
          style={styles.textInput}
          value={text2}
          onChangeText={(text) => setText2(text)}
          placeholder="Enter amount 2"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    backgroundColor: colorTheme.primary.main,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  containerAccount: {
    padding: 20,
    backgroundColor: colorTheme.primary.light,
    marginBottom: 20, // Space below the account section
  },
  accountLabel: {
    textAlign: "center",
    color: "gray",
    marginBottom: 5, // Space below the label
  },
  money: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  inputsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between", // Space between the inputs
    marginBottom: 20, // Space below the inputsWrapper
  },
  textInput: {
    flex: 1,
    marginHorizontal: 5,
    height: 40, // Adjust height as needed
  },
});

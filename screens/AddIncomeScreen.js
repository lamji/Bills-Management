/** @format */

import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import { IconButton } from "react-native-paper";
import NumbersInput from "../components/Numbers";
import { formatCurrency } from "../src/helper";

export default function AddIncomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [description, setDescription] = useState("");
  const [incomeList, setIncomeList] = useState([
    {
      id: "1",
      date: "2024-08-01",
      time: "10:00 AM",
      amount: 100,
      description: "Salary",
    },
    {
      id: "2",
      date: "2024-08-02",
      time: "02:30 PM",
      amount: 50,
      description: "Freelance Work",
    },
    {
      id: "3",
      date: "2024-08-03",
      time: "06:15 PM",
      amount: 200,
      description: "Bonus",
    },
  ]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleNext = () => {
    const now = new Date();
    const newIncome = {
      id: Math.random().toString(), // Unique ID for each income
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      amount: parseFloat(inputValue),
      description,
    };

    setIncomeList([newIncome, ...incomeList]);
    setInputValue("");
    setDescription("");
    closeModal();
  };

  const renderItem = ({ item }) => (
    <View style={styles.incomeItem}>
      <View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View>
        <Text style={styles.incomeText}>{formatCurrency(item.amount)}</Text>
        <Text style={styles.time}>
          {item.date} {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        icon="plus"
        size={70}
        onPress={openModal}
        style={styles.iconButton}
      />
      <Text style={styles.add}>Click + to add income</Text>

      <NumbersInput
        value={inputValue}
        onChange={setInputValue}
        description={description}
        onDescriptionChange={setDescription}
        visible={modalVisible}
        onClose={closeModal}
        onNext={handleNext}
      />

      <FlatList
        data={incomeList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  iconButton: {
    borderRadius: 35, // Ensures the button remains round
  },
  add: {
    textAlign: "center",
    marginVertical: 10,
    color: "gray",
  },
  list: {
    marginTop: 20,
    width: "100%",
  },
  incomeItem: {
    padding: 10,
    marginVertical: 3,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 5,
  },
  incomeText: {
    fontSize: 12,
    color: "#000",
  },
  time: {
    fontSize: 10,
    color: "gray",
  },
  description: {
    fontWeight: "bold",
    fontSize: 12,
  },
});

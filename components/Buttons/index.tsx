/** @format */

import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const ChartButtonGroup = ({
  activeButton,
  onIncomePress,
  onExpensesPress,
  incomeColor,
  expensesColor,
}: any) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button]} onPress={onIncomePress}>
        <Text
          style={[
            styles.buttonText,
            activeButton === "income" && { color: incomeColor },
          ]}
        >
          Income Chart
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button]} onPress={onExpensesPress}>
        <Text
          style={[
            styles.buttonText,
            activeButton === "expenses" && { color: expensesColor },
          ]}
        >
          Expenses Chart
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16, // Adjust margin as needed
    backgroundColor: "#E3E1D9",
    borderRadius: 5,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 8, // Space between buttons
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChartButtonGroup;

/** @format */

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  SafeAreaView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colorTheme, formatCurrency } from "../src/helper";
import BarChartComponent from "../components/BarChart/index.jsx";
import ChartButtonGroup from "../components/Buttons";
import CustomCalendar from "../components/Calendar";
import { useRefresh } from "../src/RefreshContext";

export default function HomeScreen() {
  const [selectedChart, setSelectedChart] = useState("income");
  const { refreshing, triggerRefresh } = useRefresh();
  const [isRefresh, setIsRefresh] = useState(false);

  const resetStates = () => {
    setSelectedChart("income");
  };

  const handleRefresh = async () => {
    await triggerRefresh();
    resetStates();
    setIsRefresh(!isRefresh);
  };

  const handleIncomePress = () => {
    setSelectedChart("income");
  };

  const handleExpensesPress = () => {
    setSelectedChart("expenses");
  };

  // Example transaction data
  const transactions = [
    {
      type: "Daily Expenses",
      amount: 50.0,
      date: "2024-08-09",
      image: require("../assets/spending.png"),
      description: "tst",
    },
    {
      type: "Electric Bill",
      amount: 75.0,
      date: "2024-08-08",
      image: require("../assets/electric.png"),
      description: "tst",
    },
    {
      type: "Car Payment",
      amount: 300.0,
      date: "2024-08-07",
      image: require("../assets/car.png"),
      description: "tst",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.containerAccount}>
          <Text style={styles.accountLabel}>Account Balance</Text>
          <Text style={styles.money}>{formatCurrency(10000)}</Text>
          <View style={styles.summaryWrapper}>
            <View style={styles.income}>
              <View style={styles.incomeIcon}>
                <Icon name="cash" size={30} color="#73BBA3" />
              </View>
              <View>
                <Text style={styles.textLabel}>Income</Text>
                <Text style={styles.textLabel}>{formatCurrency(5000)}</Text>
              </View>
            </View>
            <View style={styles.expense}>
              <View style={styles.incomeIcon}>
                <Icon name="cash" size={30} color="#FF7777" />
              </View>
              <View>
                <Text style={styles.textLabel}>Expense</Text>
                <Text style={styles.textLabel}>{formatCurrency(5000)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.chartSection}>
          <ChartButtonGroup
            activeButton={selectedChart}
            onIncomePress={handleIncomePress}
            onExpensesPress={handleExpensesPress}
            incomeColor="#73BBA3"
            expensesColor="#FF6F61"
          />
          <BarChartComponent />
        </View>

        <View style={styles.calendarSection}>
          <Text style={styles.transactionHeader}>Transaction History</Text>
          <CustomCalendar />
          {transactions.map((transaction, index) => (
            <View key={index} style={styles.history}>
              <View style={styles.left}>
                <Image source={transaction.image} style={styles.iconImage} />
                <View>
                  <Text style={styles.transactionText}>{transaction.type}</Text>
                  <Text style={styles.description}>
                    {transaction.description}
                  </Text>
                </View>
              </View>
              <View style={styles.right}>
                <Text style={styles.transactionText}>
                  {formatCurrency(transaction.amount)}
                </Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  containerAccount: {
    flex: 1,
    padding: 20,
    backgroundColor: colorTheme.primary.light,
  },
  accountLabel: {
    textAlign: "center",
    color: "gray",
  },
  money: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  summaryWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  income: {
    flex: 1,
    backgroundColor: colorTheme.success.light,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  expense: {
    flex: 1,
    backgroundColor: colorTheme.error.light,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  incomeIcon: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 50,
    marginRight: 5,
  },
  textLabel: {
    color: "white",
  },
  chartSection: {
    marginBottom: 20,
  },
  calendarSection: {
    marginBottom: 20,
    padding: 10,
  },
  transactionHeader: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  history: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    marginBottom: 5,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  right: {
    alignItems: "flex-end",
  },
  transactionDate: {
    fontSize: 10,
    color: "gray",
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  transactionText: {
    marginLeft: 10,
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
  },
  description: {
    fontSize: 10,
    color: "gray",
    marginLeft: 10,
  },
});

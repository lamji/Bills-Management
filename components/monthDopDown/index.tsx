/** @format */

import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Menu, Button, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type PropsDropDown = {
  dataOut: (data: string) => void;
};

const MonthDropdown = ({ dataOut }: PropsDropDown) => {
  const isRefreshing = useSelector((state: any) => state.refresh.isRefreshing);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  useEffect(() => {
    // Set the default selected month to the current month
    const currentMonth = months[new Date().getMonth()];
    setSelectedMonth(currentMonth);
  }, []);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelectMonth = (month: string) => {
    setSelectedMonth(month);
    dataOut(month);
    closeMenu();
  };

  useEffect(() => {
    setVisible(false);
    const currentMonth = months[new Date().getMonth()];
    setSelectedMonth(currentMonth);
  }, [isRefreshing]);

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <View style={styles.button}>
            <Icon
              name="chevron-down"
              size={20}
              color="black"
              style={styles.icon}
            />
            <Button
              mode="outlined"
              onPress={openMenu}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              style={{
                borderRadius: 0,
                borderWidth: 0,
                borderColor: "transparent",
                marginLeft: -20,
                width: "100%",
              }}
            >
              {selectedMonth}
            </Button>
          </View>
        }
      >
        {months.map((month) => (
          <CustomMenuItem
            key={month}
            onPress={() => handleSelectMonth(month)}
            title={month}
          />
        ))}
        <Divider />
      </Menu>
    </View>
  );
};

const CustomMenuItem: React.FC<{ onPress: () => void; title: string }> = ({
  onPress,
  title,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <Text style={styles.menuItemText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderWidth: 0,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    width: 130,
  },
  buttonContent: {
    backgroundColor: "transparent",
  },
  buttonLabel: {
    color: "black",
  },
  icon: {
    marginRight: 0,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  menuItemText: {
    fontSize: 16,
  },
});

export default MonthDropdown;

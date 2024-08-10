/** @format */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  Keyboard,
  Dimensions,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const DropdownComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const toggleDropdown = (event: any) => {
    const { pageY, pageX } = event.nativeEvent;
    setDropdownPosition({ top: pageY, left: pageX });
    setIsVisible(!isVisible);
  };

  const handleSelect = (item: any) => {
    setSelectedValue(item.label);
    setIsVisible(false);
  };

  const handlePressOutside = () => {
    if (isVisible) {
      setIsVisible(false);
      Keyboard.dismiss(); // Close keyboard if open
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableWithoutFeedback onPress={() => handleSelect(item)}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={(event) => toggleDropdown(event)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {selectedValue || "Select item"}
          </Text>
          <MaterialIcons
            name={isVisible ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={20}
            color="black"
          />
        </View>
      </TouchableWithoutFeedback>
      {isVisible && (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
          <View
            style={[
              styles.dropdown,
              {
                top: dropdownPosition.top + 35, // Adjust based on button height
                left: dropdownPosition.left,
                width: Dimensions.get("window").width * 0.8, // Adjust width as needed
              },
            ]}
          >
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 12,
    flex: 1,
  },
  dropdown: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    backgroundColor: "#fff",
    maxHeight: 200, // Adjust based on your content
    zIndex: 1000, // Ensure dropdown appears above other elements
  },
  item: {
    padding: 10,
  },
  itemText: {
    fontSize: 12,
  },
});

export default DropdownComponent;

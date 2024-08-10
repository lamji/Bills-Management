/** @format */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  dataOut: (s: string) => void;
};

const CustomizedMenus = ({ dataOut }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [addCategoryModalVisible, setAddCategoryModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    "Select Income Category"
  );
  const [newCategory, setNewCategory] = useState("");

  // Updated categories array with income-related categories
  const [categories, setCategories] = useState([
    { name: "Salary", icon: "account-cash" },
    { name: "Freelance", icon: "account-tie" },
    { name: "Investments", icon: "chart-line" },
    { name: "Rental Income", icon: "home" },
    { name: "Dividends", icon: "cash" },
    { name: "Royalties", icon: "book" },
    { name: "Interest Income", icon: "bank" },
    { name: "Bonuses", icon: "star" },
    { name: "Commissions", icon: "cash-multiple" },
    { name: "Grants", icon: "gift" },
    { name: "Pensions", icon: "cash-100" },
    { name: "Social Security", icon: "shield-account" },
    { name: "Alimony/Child Support", icon: "heart" },
  ]);

  const handlePress = () => {
    setAddCategoryModalVisible(false); // Close Add Category modal if open
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);

    setModalVisible(false);
  };

  const handleAddCategory = () => {
    setModalVisible(false); // Close main modal if open
    setAddCategoryModalVisible(true);
  };

  const handleSaveCategory = () => {
    if (newCategory) {
      setCategories([
        ...categories,
        { name: newCategory, icon: "tag-plus" }, // Add new category with a default icon
      ]);

      setSelectedOption(newCategory);
      setNewCategory(""); // Clear input
      setAddCategoryModalVisible(false); // Close Add Category modal
    }
  };

  useEffect(() => {
    dataOut(selectedOption);
  }, [selectedOption]);

  const renderItem = ({ item }: { item: { name: string; icon: string } }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => handleSelectOption(item.name)}
    >
      <Icon name={item.icon} size={20} color="black" />
      <Text style={styles.menuText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Icon name="chevron-down" size={20} color="black" />
        <Text style={styles.buttonText}>{selectedOption}</Text>
      </TouchableOpacity>

      <Modal
        transparent={false}
        visible={modalVisible}
        onRequestClose={handleClose}
        animationType="slide"
      >
        <TouchableOpacity style={styles.overlay} onPress={handleClose}>
          <View style={styles.menuContainer}>
            <FlatList
              data={categories}
              renderItem={renderItem}
              keyExtractor={(item) => item.name}
              contentContainerStyle={styles.menu}
            />
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleAddCategory}
            >
              <Icon name="plus-circle" size={20} color="black" />
              <Text style={styles.menuText}>Add Category</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        transparent={false}
        visible={addCategoryModalVisible}
        onRequestClose={() => setAddCategoryModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.overlay}>
          <View style={styles.addCategoryModal}>
            <Text style={styles.modalTitle}>Add New Category</Text>
            <TextInput
              style={styles.input}
              placeholder="Category Name"
              value={newCategory}
              onChangeText={setNewCategory}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveCategory}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setAddCategoryModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    backgroundColor: "#f5e8dd",
  },
  buttonText: {
    color: "gray",
    marginLeft: 5,
    fontSize: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    minWidth: 200,
    maxHeight: "80%", // Ensure the modal does not cover the entire screen
  },
  menu: {
    flexGrow: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  menuText: {
    fontSize: 16,
    color: "black",
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 5,
  },
  addCategoryModal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default CustomizedMenus;

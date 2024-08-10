/** @format */

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { colorTheme } from "../../src/helper";
import CustomizedMenus from "../Menu";

interface NumbersInputProps {
  value: string;
  onChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
  style?: TextStyle;
  containerStyle?: ViewStyle;
  visible: boolean;
  onClose: () => void;
  onNext: () => void;
}

const NumbersInput: React.FC<NumbersInputProps> = ({
  value,
  onChange,
  description,
  onDescriptionChange,
  style,
  containerStyle,
  visible,
  onClose,
  onNext,
}) => {
  const [isNumberEmpty, setEmptyNumber] = useState(false);
  const [isEmptyCat, setEmptyCat] = useState(false);
  const [category, setCategory] = useState("");

  const handlePress = (num: string) => {
    onChange(value + num);
    setEmptyNumber(false);
  };

  const handleDelete = () => {
    const newValue = value.slice(0, -1);
    onChange(newValue);
    if (!newValue) setEmptyNumber(true);
  };

  const handleClear = () => {
    onChange("");
    setEmptyNumber(true);
  };

  const keypadNumbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "C",
    "0",
    "⌫",
  ];

  const handleNext = () => {
    if (!value) {
      setEmptyNumber(true);
    }
    if (!category) {
      setEmptyCat(true);
    }
    if (value && category) {
      onNext();
      setEmptyCat(false);
      setEmptyNumber(false);
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        <View style={[styles.container]}>
          <View style={styles.displayContainer}>
            <CustomizedMenus
              dataOut={(i: string) => {
                setCategory(i);
                setEmptyCat(false);
                onDescriptionChange(i);
              }}
            />
            {isEmptyCat && (
              <Text style={styles.errorCat}>Category Required</Text>
            )}
            <View style={styles.numberWrapper}>
              <Text style={styles.displayLabel}>How much?</Text>
              <Text
                style={[
                  styles.displayText,
                  { color: isNumberEmpty ? "red" : "#000" },
                ]}
              >
                {value || 0}
              </Text>
              {isNumberEmpty && <Text style={styles.error}>Required</Text>}
            </View>
          </View>

          <View style={styles.keypadContainer}>
            {keypadNumbers.map((num, index) => (
              <TouchableOpacity
                key={index}
                style={styles.key}
                onPress={() => {
                  if (num === "C") handleClear();
                  else if (num === "⌫") handleDelete();
                  else handlePress(num);
                }}
              >
                <Text style={styles.keyText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  headerWrapper: {
    backgroundColor: colorTheme.primary.light,
  },
  container: {
    alignItems: "center",
    width: "100%",
  },
  displayContainer: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    backgroundColor: colorTheme.primary.light,
  },
  numberWrapper: {
    marginLeft: 15,
  },
  displayLabel: {
    fontSize: 12,
    textAlign: "left",
    color: "gray",
  },
  displayText: {
    fontSize: 34,
    textAlign: "left",
    width: "100%",
  },
  descriptionInput: {
    fontSize: 18,
    color: "#000",
    marginTop: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  keypadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
  },
  key: {
    backgroundColor: "#ddd",
    padding: 20,
    borderRadius: 10,
    margin: 5,
    width: "28%",
    alignItems: "center",
  },
  keyText: {
    fontSize: 20,
    color: "#000",
  },
  nextButton: {
    backgroundColor: colorTheme.primary.main,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 18,
    color: "#fff",
  },
  error: {
    color: colorTheme.error.main,
    fontSize: 10,
  },
  errorCat: {
    color: colorTheme.error.main,
    fontSize: 10,
    marginTop: -10,
    marginLeft: 15,
  },
});

export default NumbersInput;

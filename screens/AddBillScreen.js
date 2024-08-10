/** @format */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import { colorTheme } from "../src/helper";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

const AddBillScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [customImage, setCustomImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // Track saving status

  const availableImages = [
    require("../assets/water.png"),
    require("../assets/electric.png"),
    require("../assets/car.png"),
    require("../assets/gas.png"),
    require("../assets/spending.png"),
  ];

  const validationSchema = Yup.object().shape({
    billName: Yup.string().required("Bill name is required"),
  });

  const handleAddBill = (values) => {
    if (selectedImage || customImage) {
      setIsSaving(true); // Start the saving process

      setTimeout(() => {
        console.log(
          "Bill Added:",
          values.billName,
          selectedImage || customImage
        );
        // Reset the form after adding the bill
        values.billName = "";
        setSelectedImage(null);
        setCustomImage(null);
        setIsSaving(false); // End the saving process
      }, 1000); // Simulate API call delay of 1 second
    } else {
      Alert.alert(
        "No Icon Selected",
        "Please select an icon before adding the bill.",
        [{ text: "OK" }]
      );
    }
  };

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCustomImage(result.assets[0].uri);
      setSelectedImage(null); // Unselect any predefined image if custom image is selected
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ billName: "" }}
        validationSchema={validationSchema}
        onSubmit={handleAddBill}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              label="Bill Name"
              value={values.billName}
              onChangeText={handleChange("billName")}
              onBlur={handleBlur("billName")}
              style={styles.input}
              error={touched.billName && errors.billName ? true : false}
              theme={{
                colors: {
                  primary: colorTheme.primary.main,
                  underlineColor: "transparent",
                },
              }}
            />
            {touched.billName && errors.billName && (
              <Text style={styles.errorText}>{errors.billName}</Text>
            )}

            <Text style={styles.subtitle}>Select an Icon</Text>
            <View style={styles.imageContainer}>
              <TouchableOpacity
                onPress={handleImageUpload}
                style={styles.uploadWrapper}
              >
                <View style={styles.overlay}>
                  <Image
                    source={require("../assets/upload.png")}
                    style={styles.uploadIcon}
                  />
                </View>
              </TouchableOpacity>

              {availableImages.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedImage(image);
                    setCustomImage(null); // Unselect custom image if predefined image is selected
                  }}
                  style={[
                    styles.imageWrapper,
                    selectedImage === image && styles.selectedImage,
                  ]}
                >
                  <Image source={image} style={styles.iconImage} />
                </TouchableOpacity>
              ))}

              {customImage && (
                <TouchableOpacity
                  style={[styles.imageWrapper, styles.selectedImage]}
                  onPress={() => setCustomImage(null)} // Option to deselect custom image
                >
                  <Image
                    source={{ uri: customImage }}
                    style={styles.iconImage}
                  />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity style={styles.fab} onPress={handleSubmit}>
              {isSaving ? (
                <ActivityIndicator color="white" /> // Loading indicator
              ) : (
                <MaterialIcons name="save" size={24} color="white" /> // Save icon
              )}
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  uploadWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: "#00aaff",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    position: "relative", // To allow absolute positioning of overlay
    marginTop: 10,
  },
  uploadIcon: {
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Position the overlay to cover the whole area
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Black color with 50% opacity
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  uploadText: {
    marginTop: 5,
    color: colorTheme.primary.main,
    fontSize: 14,
  },
  imageWrapper: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "transparent",
    alignItems: "center",
    width: "23%",
  },
  selectedImage: {
    borderColor: colorTheme.primary.main,
  },
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: colorTheme.primary.main,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  errorText: {
    color: colorTheme.error.main,
    fontSize: 12,
    marginBottom: 10,
  },
});

export default AddBillScreen;

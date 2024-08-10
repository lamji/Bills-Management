/** @format */

// components/HomeHeader.js
import React from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MonthDropdown from "../monthDopDown";

const HomeHeader = ({ onAvatarPress, onIconPress, onDropdownChange }: any) => {
  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity onPress={onAvatarPress}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={40}
            source={{
              uri: "https://miro.medium.com/v2/resize:fit:3840/1*0ubYRV_WNR9iYrzUAVINHw.jpeg",
            }} // Replace with your image URL
            style={styles.avatar}
          />
        </View>
      </TouchableOpacity>
      <View>
        <MonthDropdown dataOut={onDropdownChange} />
      </View>
      <TouchableOpacity onPress={onIconPress}>
        <Icon
          name="plus" // Add icon from MaterialCommunityIcons
          size={30}
          color="gray" // Icon color
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row", // Main axis is horizontal
    justifyContent: "space-between", // Distribute space between children
    alignItems: "center", // Align children to the center of the cross axis
    backgroundColor: "#F5E8DD",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#00aaff", // Blue gradient border color
    backgroundColor: "#ffffff", // Optional: Background color for border area
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    borderRadius: 25, // Make sure avatar is circular
  },
  icon: {
    marginLeft: 10,
  },
});

export default HomeHeader;

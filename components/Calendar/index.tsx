/** @format */

import { addDays } from "date-fns/addDays";
import { addWeeks } from "date-fns/addWeeks";
import { eachDayOfInterval } from "date-fns/eachDayOfInterval";
import { format } from "date-fns/format";
import { startOfWeek } from "date-fns/startOfWeek";
import { subWeeks } from "date-fns/subWeeks";
import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { colorTheme } from "../../src/helper";

const CustomCalendar = () => {
  const isRefreshing = useSelector((state: any) => state.refresh.isRefreshing);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date())
  );
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getWeekDays = useCallback((startDate: Date) => {
    return eachDayOfInterval({
      start: startDate,
      end: addDays(startDate, 6),
    });
  }, []);

  const handlePrevWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const handleDayPress = (date: Date) => {
    setSelectedDate(date);
    Alert.alert("Selected Date", format(date, "yyyy-MM-dd"));
  };

  const isNextButtonDisabled =
    startOfWeek(new Date()).getTime() === currentWeekStart.getTime();

  const weekDays = getWeekDays(currentWeekStart);

  // Reset calendar state
  React.useEffect(() => {
    setCurrentWeekStart(startOfWeek(new Date()));
    setSelectedDate(new Date());
  }, [isRefreshing]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrevWeek}>
          <Icon name="chevron-left" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {format(currentWeekStart, "MMMM yyyy")}
        </Text>
        <TouchableOpacity
          style={[styles.navButton]}
          onPress={handleNextWeek}
          disabled={isNextButtonDisabled}
        >
          <Icon
            name="chevron-right"
            size={30}
            color={isNextButtonDisabled ? "#d0d0d0" : "#000"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.weekContainer}>
        {weekDays.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayContainer,
              {
                backgroundColor:
                  selectedDate.toDateString() === item.toDateString()
                    ? colorTheme.primary.dark
                    : colorTheme.secondary.light,
              },
            ]}
            onPress={() => handleDayPress(item)}
          >
            <Text style={styles.dayText}>{format(item, "EEE")}</Text>
            <Text style={styles.dateText}>{format(item, "d")}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  navButton: {
    padding: 8,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weekContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  dayContainer: {
    width: "12.50%",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5,
  },
  dayText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
  },
});

export default CustomCalendar;

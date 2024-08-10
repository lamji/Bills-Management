/** @format */

import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BarChart, XAxis } from "react-native-svg-charts";
import { Text, Rect } from "react-native-svg";
import { Card } from "react-native-paper";
import { formatShortCurrency } from "../../src/helper";

const screenWidth = Dimensions.get("window").width;

const CustomBar = ({ x, y, bandwidth, data }) => {
  return data.map((value, index) => (
    <Rect
      key={index}
      x={x(index)}
      y={y(value)}
      width={bandwidth}
      height={y(0) - y(value)}
      fill="#73BBA3" // Bar color
      rx={8} // Border radius
      ry={8} // Border radius
    />
  ));
};

class BarChartVerticalWithLabels extends React.PureComponent {
  render() {
    const data = [
      2000, 3000, 1500, 4000, 2500, 3500, 3000, 2700, 2000, 5000, 4500, 6000,
    ]; // Monthly data
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]; // Month labels

    const CUT_OFF = 3000; // Adjust this value based on your data to position labels correctly
    const Labels = ({ x, y, bandwidth, data }) =>
      data.map((value, index) => (
        <Text
          key={index}
          x={x(index) + bandwidth / 2}
          y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
          fontSize={10} // Adjusted font size
          fill={value >= CUT_OFF ? "white" : "black"}
          alignmentBaseline={"middle"}
          textAnchor={"middle"}
        >
          {formatShortCurrency(value)}
        </Text>
      ));

    return (
      <Card style={styles.card}>
        <View style={styles.container}>
          <BarChart
            style={styles.chart}
            data={data}
            svg={{ fill: "transparent" }} // Set to transparent to use custom bars
            contentInset={{ top: 10, bottom: 10 }}
            spacing={0.1} // Adjust spacing to reduce overlap
            gridMin={0}
          >
            <CustomBar />
            <Labels />
          </BarChart>
          <XAxis
            style={styles.xAxis}
            data={data}
            svg={{ fontSize: 10, fill: "black" }} // X-axis label style
            contentInset={{ left: 20, right: 22 }}
            formatLabel={(value, index) => months[index]} // Format month labels
          />
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 10,
    borderRadius: 8,
    elevation: 2, // Shadow for paper effect
  },
  container: {
    height: 250,
    flexDirection: "column",
  },
  chart: {
    flex: 1,
    marginBottom: 8,
  },
  xAxis: {
    marginHorizontal: -10,
    height: 30,
  },
});

export default BarChartVerticalWithLabels;

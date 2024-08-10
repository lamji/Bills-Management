/** @format */

import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import AddBillScreen from "./screens/AddBillScreen";
import BudgetScreen from "./screens/BudgetScreen";
import AddIncomeScreen from "./screens/AddIncomeScreen";
import AddCategoryScreen from "./screens/addIncomeCategory"; // Import AddCategoryScreen
import { RefreshProvider } from "./src/RefreshContext";
import HomeHeader from "./components/HomeHeader";
import store from "./src/app/store";
import { colorTheme } from "./src/helper";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Define Stack Navigator with non-tab screens
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Homessr"
      component={HomeScreen}
      options={{ headerShown: false }} // Hide the header for this screen
    />
    <Stack.Screen
      name="AddCategory"
      component={AddCategoryScreen}
      options={{ title: "Add Category" }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <RefreshProvider>
          <NavigationContainer>
            <StatusBar
              backgroundColor={colorTheme.primary.light}
              barStyle="dark-content"
            />
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarActiveTintColor: "#6200ee",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: { backgroundColor: "#fff" },
                headerStyle: {
                  backgroundColor: colorTheme.primary.light,
                },
                headerTitleAlign: "center",
                headerTitleStyle: {
                  textTransform: "uppercase", // Capitalize header titles
                  fontWeight: "bold", // Optional: Makes the title bold
                  fontSize: 16, // Optional: Adjust the font size
                },
              })}
            >
              <Tab.Screen
                name="HomeTab"
                component={StackNavigator} // Use stack navigator for Home and AddCategory
                options={({ navigation }) => ({
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="home" color={color} size={size} />
                  ),
                  title: "", // Header title
                  header: () => (
                    <HomeHeader
                      onAvatarPress={() => alert("Avatar pressed")}
                      onIconPress={() => alert("Icon pressed")}
                      onDropdownChange={(i: any) =>
                        alert(`Dropdown value: ${i}`)
                      }
                    />
                  ),
                })}
              />
              <Tab.Screen
                name="Add Bill"
                component={AddBillScreen}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="plus-circle" color={color} size={size} />
                  ),
                  title: "Add Bill", // Header title
                }}
              />
              <Tab.Screen
                name="Budget"
                component={BudgetScreen}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="cash" color={color} size={size} />
                  ),
                  title: "Budget", // Header title
                }}
              />
              <Tab.Screen
                name="Add Income"
                component={AddIncomeScreen}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="currency-usd" color={color} size={size} />
                  ),
                  title: "Add Income", // Header title
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </RefreshProvider>
      </PaperProvider>
    </Provider>
  );
}

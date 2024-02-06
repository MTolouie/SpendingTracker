import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecentExpenses from "./screens/RecentExpenses";
import ManageExpense from "./screens/ManageExpense";
import { NavigationContainer } from "@react-navigation/native";
import { Fragment } from "react";
import AllExpenses from "./screens/AllExpenses";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
export default function App() {
  const stack = createNativeStackNavigator();
  const bottom = createBottomTabNavigator();

  const BottmTabNavigator = () => {
    return (
      <bottom.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("ManageExpense");
              }}
            />
          ),
        })}
      >
        <bottom.Screen
          name="AllExpenses"
          component={AllExpenses}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="hourglass" size={size} color={color} />
            ),
            tabBarLabel: "All Expenses",
            title: "All Expenses",
          }}
        />
        <bottom.Screen
          name="RecentExpenses"
          component={RecentExpenses}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
            tabBarLabel: "Recent Expenses",
            title: "Recent Expenses",
          }}
        />
      </bottom.Navigator>
    );
  };

  return (
    <Fragment>
      <StatusBar style="light" />
      <NavigationContainer>
        <stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: "white",
          }}
        >
          <stack.Screen
            name="ExpensesOverview"
            component={BottmTabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <stack.Screen
            name="ManageExpense"
            component={ManageExpense}
            options={{
              presentation: "modal",
            }}
          />
        </stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
}

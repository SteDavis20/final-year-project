import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./navigation/screens/Login";
import NavBar from "./navigation/NavBar";
import LogFoodScreen from "./navigation/screens/LogFoodScreen";
import LogTransportScreen from "./navigation/screens/LogTransportScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="HomePage"
          component={NavBar}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Log Food"
          component={LogFoodScreen}
          options={{ title: "Log Food" }}
        />
        <Stack.Screen
          name="Log Transport"
          component={LogTransportScreen}
          options={{ title: "Log Transport" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

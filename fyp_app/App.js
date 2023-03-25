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
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomePage"
          component={NavBar}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Log Food"
          component={LogFoodScreen}
          options={{
            headerShown: true,
          }}
          // style title...
          // title: "",setTransportLogTotalCo2e(tempTotalTransportCo2e);
        />
        <Stack.Screen
          name="Log Transport"
          component={LogTransportScreen}
          options={{
            headerShown: true,
            title: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

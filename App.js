import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AnmeldungScreen from "./src/screens/AnmeldungScreen";
import RegistrierungScreen from "./src/screens/RegistrierungScreen";
import PflanzenListeScreen from "./src/screens/PflanzenListeScreen";
import PflanzeErfassenScreen from "./src/screens/PflanzeErfassenScreen";
import PflanzeDetailScreen from "./src/screens/PflanzeDetailScreen";
import PflegeAufgabeScreen from "./src/screens/PflegeAufgabeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Anmeldung">
        <Stack.Screen
          name="Anmeldung"
          component={AnmeldungScreen}
          options={{ title: "Anmeldung" }}
        />
        <Stack.Screen
          name="Registrierung"
          component={RegistrierungScreen}
          options={{ title: "Registrierung" }}
        />
        <Stack.Screen
          name="PflanzenListe"
          component={PflanzenListeScreen}
          options={{ title: "Meine Pflanzen" }}
        />
        <Stack.Screen
          name="PflanzeErfassen"
          component={PflanzeErfassenScreen}
          options={{ title: "Pflanze erfassen" }}
        />
        <Stack.Screen
          name="PflanzeDetail"
          component={PflanzeDetailScreen}
          options={{ title: "Pflanze Details" }}
        />
        <Stack.Screen
          name="PflegeAufgabe"
          component={PflegeAufgabeScreen}
          options={{ title: "Pflegeaufgabe" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
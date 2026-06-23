import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { supabase } from "./src/services/supabaseClient";

import AnmeldungScreen from "./src/screens/AnmeldungScreen";
import RegistrierungScreen from "./src/screens/RegistrierungScreen";
import PflanzenListeScreen from "./src/screens/PflanzenListeScreen";
import PflanzeErfassenScreen from "./src/screens/PflanzeErfassenScreen";
import PflanzeDetailScreen from "./src/screens/PflanzeDetailScreen";
import PflegeAufgabeScreen from "./src/screens/PflegeAufgabeScreen";

const Stack = createNativeStackNavigator();
const appSchrift =
  Platform.OS === "android" ? "sans-serif-condensed" : "Calibri";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = [Text.defaultProps.style, { fontFamily: appSchrift }];

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.style = [
  TextInput.defaultProps.style,
  { fontFamily: appSchrift },
];

export default function App() {
  const [session, setSession] = useState(null);
  const [laedt, setLaedt] = useState(true);

  useEffect(() => {
    async function sessionLaden() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLaedt(false);
    }

    sessionLaden();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, neueSession) => {
        setSession(neueSession);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (laedt) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {session ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={screenOptionen}>
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
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={screenOptionen}>
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
  );
}

const screenOptionen = {
  headerTitleStyle: {
    fontFamily: appSchrift,
  },
};

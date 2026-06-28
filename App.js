import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  supabase,
  supabaseKonfigurationOk,
} from "./src/services/supabaseClient";

import AnmeldungScreen from "./src/screens/AnmeldungScreen";
import RegistrierungScreen from "./src/screens/RegistrierungScreen";
import PflanzenListeScreen from "./src/screens/PflanzenListeScreen";
import PflanzeErfassenScreen from "./src/screens/PflanzeErfassenScreen";
import PflanzeDetailScreen from "./src/screens/PflanzeDetailScreen";
import PflegeAufgabeScreen from "./src/screens/PflegeAufgabeScreen";
import PflanzeErkennenScreen from "./src/screens/PflanzeErkennenScreen";
import { appSchrift } from "./src/components/AppText";

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);
  const [laedt, setLaedt] = useState(true);

  useEffect(() => {
    if (!supabaseKonfigurationOk) {
      setLaedt(false);
      return;
    }

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

  if (!supabaseKonfigurationOk) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
        <AppText style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>
          Konfiguration fehlt
        </AppText>
        <AppText style={{ fontSize: 16 }}>
          Supabase ist nicht korrekt eingerichtet. Bitte prüfe die
          EAS-Umgebungsvariablen für den Preview-Build.
        </AppText>
      </View>
    );
  }

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
      <Stack.Screen
        name="PflanzeErkennen"
        component={PflanzeErkennenScreen}
        options={{ title: "Pflanze erkennen" }}
      />
    </Stack.Navigator>
  );
}

const screenOptionen = {
  headerTitleStyle: {
    fontFamily: appSchrift,
  },
};

import React from "react";
import { Platform, StyleSheet, Text } from "react-native";

export const appSchrift = Platform.OS === "android" ? "serif" : "Calibri";

export default function AppText({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: appSchrift,
  },
});

import React from "react";
import { Pressable, StyleSheet } from "react-native";
import AppText from "./AppText";

export default function AppButton({ title, onPress, disabled, variant = "primary" }) {
  return (
    <Pressable
      style={[
        styles.button,
        variant === "danger" ? styles.danger : styles.primary,
        disabled ? styles.disabled : null,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <AppText style={styles.text}>{title}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    padding: 12,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#1976d2",
  },
  danger: {
    backgroundColor: "#b00020",
  },
  disabled: {
    backgroundColor: "#999",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});

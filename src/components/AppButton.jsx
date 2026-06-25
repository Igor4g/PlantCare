import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./AppText";

export default function AppButton({
  title,
  onPress,
  disabled,
  variant = "primary",
  iconName,
  iconOnly = false,
  style,
}) {
  const istOutline = variant === "outline";
  const textFarbe = istOutline ? "#2f6b3f" : "#fff";

  return (
    <Pressable
      style={[
        styles.button,
        iconOnly ? styles.iconButton : null,
        styles[variant] || styles.primary,
        disabled ? styles.disabled : null,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.inhalt}>
        {iconName ? (
          <Ionicons name={iconName} size={18} color={textFarbe} />
        ) : null}

        {!iconOnly ? (
          <AppText style={[styles.text, istOutline ? styles.outlineText : null]}>
            {title}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  iconButton: {
    width: 42,
    height: 42,
    paddingVertical: 0,
    paddingHorizontal: 0,
    justifyContent: "center",
  },
  inhalt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  primary: {
    backgroundColor: "#2f6b3f",
  },
  secondary: {
    backgroundColor: "#4f6f52",
  },
  outline: {
    backgroundColor: "#fff",
    borderColor: "#2f6b3f",
  },
  danger: {
    backgroundColor: "#a23a3a",
  },
  disabled: {
    backgroundColor: "#999",
    borderColor: "#999",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  outlineText: {
    color: "#2f6b3f",
  },
});

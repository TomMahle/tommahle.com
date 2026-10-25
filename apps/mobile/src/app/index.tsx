import { emptyCart, subtotalCents } from "@tommahle/checkout";
import { useTheme } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function CheckoutScreen() {
  const { colors } = useTheme();
  const cart = emptyCart();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Checkout</Text>
      <Text style={{ color: colors.text }}>
        {cart.items.length} items · ${(subtotalCents(cart) / 100).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: { fontSize: 24, fontWeight: "600" },
});

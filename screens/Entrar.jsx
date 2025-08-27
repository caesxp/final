import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from "react-native";

export default function Entrar({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: "https://st2.depositphotos.com/1080148/8987/i/450/depositphotos_89877922-stock-photo-senior-couple-with-strawberries.jpg" }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Aposenta+</Text>

        <Text style={styles.paragraph}>
          O Aposenta+ ajuda você a planejar seu futuro com segurança e confiança. 
          Nossa plataforma oferece informações práticas, ferramentas intuitivas e 
          orientações personalizadas para que você possa construir uma aposentadoria 
          tranquila, do seu jeito.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Inicio")}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    transform: [{ scale: 1.2 }], // efeito afastado
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // camada escura
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    color: "#e5e5e5",
    textAlign: "center", // texto reto, centralizado horizontalmente
    width: width * 0.85, // limita a largura para caber na tela
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E40AF",
  },
});

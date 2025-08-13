import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Detalhes({ route }) {
  const { dados } = route.params;

  return (
    <View style={styles.container}>
      <Text>Prazo total até a aposentadoria: {dados.mesesAteAposentadoria} meses</Text>
      <Text>Valor mensal necessário para atingir o objetivo: R$ {dados.valorMensal.toFixed(2)}</Text>
      <Text>Valor acumulado se guardar R$ 300/mês: R$ {dados.acumuladoCom300.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:'center' },
});

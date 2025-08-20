import React from 'react';
import { View, Dimensions, ScrollView, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Detalhes({ route }) {
  const { dados } = route.params;

  const taxaMensal = 0.007; // 0,7% ao mês
  const saldo = [];
  const saldo300 = [];
  let acumulado = 0;
  let acumulado300 = 0;

  // Calcula mês a mês o saldo acumulado
  for (let i = 1; i <= dados.mesesAteAposentadoria; i++) {
    acumulado = acumulado * (1 + taxaMensal) + parseFloat(dados.valorMensal);
    acumulado300 = acumulado300 * (1 + taxaMensal) + 300;
    saldo.push(parseFloat(acumulado.toFixed(2)));
    saldo300.push(parseFloat(acumulado300.toFixed(2)));
  }

  

  // Labels a cada 12 meses (1 ano) para não poluir o gráfico
  const labels = [];
  for (let i = 1; i <= dados.mesesAteAposentadoria; i++) {
    if (i % 12 === 0) labels.push((i / 12).toString());
    else labels.push('');
  }

  return (
    <ScrollView style={styles.container}>
      <Text>Prazo total até a aposentadoria: {dados.mesesAteAposentadoria} meses</Text>
      <Text>Valor mensal necessário para atingir o objetivo: R$ {parseFloat(dados.valorMensal).toFixed(2)}</Text>
      <Text>Valor acumulado se guardar 300R$ por mês: R$ {parseFloat(dados.acumuladoCom300).toFixed(2)}</Text>

      <ScrollView horizontal={true}>
        <LineChart
          data={{
            labels: labels,
            datasets: [
              { data: saldo, color: (opacity = 1) => `rgba(0, 102, 204, ${opacity})`, strokeWidth: 2 },
              { data: saldo300, color: (opacity = 1) => `rgba(204, 0, 0, ${opacity})`, strokeWidth: 2 }
            ],
            legend: ["Saldo necessário", "Saldo com 300R$/mês"]
          }}
          width={Math.max(Dimensions.get("window").width, dados.mesesAteAposentadoria * 5)}
          height={300}
          yAxisLabel="R$ "
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: "2", strokeWidth: "1", stroke: "#0066cc" }
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, },
});

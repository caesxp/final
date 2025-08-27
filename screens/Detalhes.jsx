import React from 'react';
import { View, Dimensions, ScrollView, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Detalhes({ route }) {
  const { dados } = route.params;
  const taxaMensal = dados.taxaMensal;
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
      <View style={styles.card}>
        <Text style={styles.title}>Resumo da Aposentadoria</Text>

        <View style={styles.resultBlock}>
          <Text style={styles.resultText}>
            Prazo total até a aposentadoria: <Text style={styles.highlight}>{dados.mesesAteAposentadoria} meses</Text>
          </Text>
          <Text style={styles.resultText}>
            Valor mensal necessário: <Text style={styles.highlight}>R$ {parseFloat(dados.valorMensal).toFixed(2)}</Text>
          </Text>
          <Text style={styles.resultText}>
            Valor acumulado com 300R$/mês: <Text style={styles.highlight}>R$ {parseFloat(dados.acumuladoCom300).toFixed(2)}</Text>
          </Text>
        </View>

        <Text style={styles.chartTitle}>Projeção de Saldo</Text>
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
            width={Math.max(Dimensions.get("window").width - 40, dados.mesesAteAposentadoria * 5)}
            height={300}
            yAxisSuffix="R$"
            fromZero={true}
            chartConfig={{
              backgroundColor: "#e0f0ff",
              backgroundGradientFrom: "#e0f0ff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: "3", strokeWidth: "1", stroke: "#0066cc" }
            }}
            bezier
            style={{ marginVertical: 12, borderRadius: 16 }}
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#0066cc'
  },
  resultBlock: {
    marginBottom: 20,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 8,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#004080',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0066cc'
  },
});

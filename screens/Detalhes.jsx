import React from 'react';
import { View, Dimensions, ScrollView, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Detalhes({ route }) {
  const { dados } = route.params;

  // puxa os dados da tela inicial
  const taxaMensal = dados.taxaMensal;  // taxa de rentabilidade mensal
  const valorMensal = dados.valorMensal; // valor mensal calculado
  const mesesAteAposentadoria = dados.mesesAteAposentadoria;

  // olha se a taxaMensal está definida certa
  if (taxaMensal === undefined || isNaN(taxaMensal)) {
    console.error("Valor inválido de taxaMensal:", taxaMensal);
    return <Text>Erro: Taxa de rentabilidade inválida.</Text>;
  }

  // inicializa os arrays para saldo
  const saldo = [];
  const saldo300 = [];

  let acumulado = 0;  // saldo inicial é 0
  let acumulado300 = 0;  // saldo inicial para 300R$/mês é 0

  // calcula mês a mês o saldo acumulado
  for (let i = 1; i <= mesesAteAposentadoria; i++) {
    // formula de juros compostos: saldo anterior * (1 + taxa de rentabilidade) + contribuição mensal
    acumulado = acumulado * (1 + taxaMensal) + valorMensal;
    acumulado300 = acumulado300 * (1 + taxaMensal) + 300;

    // adiciona os valores ao gráfico, com arredondamento para 2 casas decimais
    saldo.push(parseFloat(acumulado.toFixed(2)));
    saldo300.push(parseFloat(acumulado300.toFixed(2)));
  }

  // labels a cada 24 meses (2 anos)
  const labels = [];
  for (let i = 1; i <= mesesAteAposentadoria; i++) {
    if (i % 24 === 0) labels.push((i / 12).toString());
    else labels.push('');
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Resumo da Aposentadoria</Text>

        <View style={styles.resultBlock}>
          <Text style={styles.resultText}>
            Prazo total até a aposentadoria: <Text style={styles.highlight}>{mesesAteAposentadoria} meses</Text>
          </Text>
          <Text style={styles.resultText}>
            Valor mensal necessário: <Text style={styles.highlight}>R$ {parseFloat(valorMensal).toFixed(2)}</Text>
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
                {
                  data: saldo,
                  color: (opacity = 1) => `rgba(0, 102, 204, ${opacity})`, // linha azul (saldo necessário)
                  strokeWidth: 2,
                },
                {
                  data: saldo300,
                  color: (opacity = 1) => `rgba(204, 0, 0, ${opacity})`, // linha vermelha (saldo com 300R$/mês)
                  strokeWidth: 2,
                },
              ],
              legend: ["Saldo necessário", "Saldo com 300R$/mês"], // legenda
            }}
            width={Math.max(Dimensions.get("window").width - 40, mesesAteAposentadoria * 5)} // ajusta a largura do gráfico
            height={300} // altura do gráfico
            fromZero={true} // garante que o gráfico começa do zero
            chartConfig={{
              backgroundColor: "#e0f0ff",
              backgroundGradientFrom: "#e0f0ff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0, // limita a 0 casas decimais (remove o .00)
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // cor dos rótulos e texto
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // cor das labels no gráfico
              style: { borderRadius: 16 }, // borda arredondada
              propsForDots: { r: "3", strokeWidth: "1", stroke: "#0066cc" }, // estilo dos ponto
            }}
            bezier // suaviza as linhas
            style={{ marginVertical: 12, borderRadius: 16 }} // estilo do gráfico
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
    color: '#0066cc',
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
    color: '#0066cc',
  },
});

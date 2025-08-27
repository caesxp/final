import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ScrollView } from 'react-native';

export default function Inicial({ navigation }) {
  const [idadeAtual, setIdadeAtual] = useState('');
  const [idadeAposentadoria, setIdadeAposentadoria] = useState('');
  const [valorAposentadoria, setValorAposentadoria] = useState('');
  const [rentabilidadeMensal, setRentabilidadeMensal] = useState('');

  const calcularValores = () => {
    if (!idadeAtual || !idadeAposentadoria || !valorAposentadoria || !rentabilidadeMensal) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const idadeAtualNum = parseInt(idadeAtual);
    const idadeAposNum = parseInt(idadeAposentadoria);
    const valorFinal = parseFloat(valorAposentadoria);
    const taxaMensal = parseFloat(rentabilidadeMensal) / 100;
    const mesesAteAposentadoria = (idadeAposNum - idadeAtualNum) * 12;
    const valorMensal = (valorFinal * taxaMensal) / (Math.pow(1 + taxaMensal, mesesAteAposentadoria) - 1);
    const acumuladoCom300 = 300 * (Math.pow(1 + taxaMensal, mesesAteAposentadoria) - 1) / taxaMensal;

    const dados = { mesesAteAposentadoria, valorMensal, acumuladoCom300 };
    navigation.navigate('Detalhes', { dados });
  };

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Idade atual</Text>
          <TextInput
            placeholder="Digite sua idade atual"
            keyboardType="numeric"
            style={styles.input}
            value={idadeAtual}
            onChangeText={setIdadeAtual}
          />

          <Text style={styles.label}>Idade para aposentadoria</Text>
          <TextInput
            placeholder="Digite a idade que deseja se aposentar"
            keyboardType="numeric"
            style={styles.input}
            value={idadeAposentadoria}
            onChangeText={setIdadeAposentadoria}
          />

          <Text style={styles.label}>Valor desejado na aposentadoria (R$)</Text>
          <TextInput
            placeholder="Ex: 100000"
            keyboardType="numeric"
            style={styles.input}
            value={valorAposentadoria}
            onChangeText={setValorAposentadoria}
          />

          <Text style={styles.label}>Rentabilidade mensal (%)</Text>
          <TextInput
            placeholder="Ex: 0,7"
            keyboardType="numeric"
            style={styles.input}
            value={rentabilidadeMensal}
            onChangeText={setRentabilidadeMensal}
          />

          <TouchableOpacity style={styles.button} onPress={calcularValores}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#DBEAFE', // azul claro
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10, // para Android
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    color: '#1E40AF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#1c10c5ff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

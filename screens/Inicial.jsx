import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

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
    <View style={styles.container}>
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
        placeholder="Ex: 0,5"
        keyboardType="numeric"
        style={styles.input}
        value={rentabilidadeMensal}
        onChangeText={setRentabilidadeMensal}
      />

      <TouchableOpacity style={styles.button} onPress={calcularValores}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:'center' },
  label: { fontWeight:'bold', marginBottom:5, marginTop:10 },
  input: { borderWidth:1, borderColor:'#ccc', padding:10, borderRadius:5 },
  button: { backgroundColor:'#0066cc', padding:15, borderRadius:5, alignItems:'center', marginTop:20 },
  buttonText: { color:'#fff', fontWeight:'bold' },
});

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import Api from './src/page/consultaCep';
import { ButtonSmall } from './src/page/buttonSmall';

export default function App() {

  const [ cep, setCep ] = useState('');
  const [ tipo, setTipo ] = useState('');
  const [ endereco, setEndereco ] = useState('');
  const [ bairro, setBairro ] = useState('');
  const [ cidade, setCidade ] = useState('');
  const [ estado, setEstado ] = useState('');
  const [ ddd, setDdd ] = useState('');
  const [ long, setLong ] = useState('');
  const [ lati, setLati ]  = useState('');

  async function buscarCep () {
    if (cep === ""){
      Alert.alert("CEP inválido")
      setCep("")
    }
    try {
      const response = await Api.get(`${cep}`)
      setTipo(response.data.address_type)
      setEndereco(response.data.address)
      setBairro(response.data.district)
      setCidade(response.data.city)
      setEstado(response.data.state)
      setDdd(response.data.ddd)
      setLong(response.data.lng)
      setLati(response.data.lat)


    }catch(error){
      console.log("Erro" + error)
      alert("Cep incorreto")
    }
  }

  function limpar () {
    setCep("")
    setTipo("")
    setEndereco("")
    setBairro("")
    setCidade("")
    setEstado("")
    setDdd("")
    setLong("")
    setLati("")
  }

  async function copyToClipboard () {
    try {
      await Clipboard.setStringAsync(`${endereco}, ${bairro}, ${cidade} / ${estado} - ${cep}.`);
    }catch(error){
      console.log("error" + error)
    }
  }

  return (
    <View style={styles.container}>

      <TextInput
        placeholder='Digite aqui o CEP'
        keyboardType='numeric'
        value={cep}
        onChangeText={Text => setCep(Text)}
        style={styles.input}
      />
      
      <ButtonSmall title='Buscar' onPress={buscarCep} />
      
      <TextInput
        placeholder='Tipo'
        value={tipo}
        onChangeText={Text => setTipo(Text)}
        style={styles.input}
      />

      <TextInput
        placeholder='Endereço'
        value={endereco}
        onChangeText={Text => setEndereco(Text)}
        style={styles.input}
      />

      <TextInput
        placeholder='Bairro'
        value={bairro}
        onChangeText={Text => setBairro(Text)}
        style={styles.input}
      />

      <TextInput
        placeholder='Cidade'
        value={cidade}
        onChangeText={Text => setCidade(Text)}
        style={styles.input}
      />

      <TextInput
        placeholder='Estado'
        value={estado}
        onChangeText={Text => setEstado(Text)}
        style={styles.input}
      />

      <TextInput
        placeholder='DDD'
        value={ddd}
        onChangeText={Text => setDdd(Text)}
        style={styles.input}
      />

      <TextInput
        placeholder='Longitude'
        value={long}
        onChangeText={Text => setLong(Text)}
        style={styles.input}
      />

      <TextInput
        placeholder='Latitude'
        value={lati}
        onChangeText={Text => setLati(Text)}
        style={styles.input}
      />

      <ButtonSmall title='Limpar' onPress={limpar} />

      <ButtonSmall title='Copiar Endereço' 
        onPress={copyToClipboard}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A009',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: 280,
    height: 40,
    fontSize: 17,
  },
  paraTexto: {
    fontSize: 20,
    paddingHorizontal: 35,
    marginTop: 15,
  },
});

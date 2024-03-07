import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Alert, ImageBackground, Keyboard, TouchableNativeFeedback, ScrollView } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import Api from './src/page/consultaCep';
import { ButtonSmall } from './src/page/buttonSmall';
import backg from './assets/back.jpg';

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

<TouchableNativeFeedback touchSoundDisabled onPress={() => Keyboard.dismiss()} >
    <ImageBackground source={backg} style={styles.background}>
      <ScrollView>
      
        <View style={styles.container}>

          <Text style={styles.paraTexto}>Consulte seu CEP</Text>

        <TextInput
          placeholder='Digite aqui o CEP'
          keyboardType='numeric'
          value={cep}
          onChangeText={Text => setCep(Text)}
          style={styles.input}
        />

        <View style={styles.central}>
          <ButtonSmall title='Buscar' onPress={buscarCep} />
        </View>

        <TextInput
          placeholder='Tipo do Endereço'
          value={tipo}
          onChangeText={Text => setTipo(Text)}
          style={styles.input}
          editable={false}
        />

        <TextInput
          placeholder='Endereço'
          value={endereco}
          onChangeText={Text => setEndereco(Text)}
          style={styles.input}
          editable={false}
        />

        <TextInput
          placeholder='Bairro'
          value={bairro}
          onChangeText={Text => setBairro(Text)}
          style={styles.input}
          editable={false}
        />

        <TextInput
          placeholder='Cidade'
          value={cidade}
          onChangeText={Text => setCidade(Text)}
          style={styles.input}
          editable={false}
        />

        <TextInput
          placeholder='Estado'
          value={estado}
          onChangeText={Text => setEstado(Text)}
          style={styles.input}
          editable={false}
        />

        <TextInput
          placeholder='DDD'
          value={ddd}
          onChangeText={Text => setDdd(Text)}
          style={styles.input}
          editable={false}
        />

        <TextInput
          placeholder='Longitude'
          value={long}
          onChangeText={Text => setLong(Text)}
          style={styles.input}
          editable={false}
        />

        <TextInput
          placeholder='Latitude'
          value={lati}
          onChangeText={Text => setLati(Text)}
          style={styles.input}
          editable={false}
        />
        <View style={styles.central}>
          <ButtonSmall title='Limpar' onPress={limpar} />

          <ButtonSmall title='Copiar Endereço' 
            onPress={copyToClipboard}
          />
        </View>

        </View>
        
      </ScrollView>
    </ImageBackground>
</TouchableNativeFeedback>
    
  );
}

const styles = StyleSheet.create({
  
  
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A009',
    
  },

  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
    width: 320,
    height: 40,
    fontSize: 15,
    color: 'black',
    justifyContent: 'center',
    
    opacity: 1.90,
  },

  central: {
    alignItems: 'center',
  },

  paraTexto: {
    fontSize: 20,
    paddingHorizontal: 35,
    marginTop: 80,
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
    height: 50,
    paddingTop: 10,
  },
});

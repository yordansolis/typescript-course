import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FAB from './components/FAB';
import { useState } from 'react';

export default function App() {

  // Bussiness logic  🏢
  const [count, setCount] = useState(10)



  return (
    <View style={styles.container}>


      <Text> JHORDAN SOLIS  </Text>

      <Text style={styles.text}>{count}</Text>



      <FAB label='+1'
        onPress={() => setCount(count + 1)}
        onLongPress={() => setCount(0)}
        positions="rigth"
      />


      <FAB label='Reset'
        onPress={() => setCount(0)}
        positions="left"
      />



      <StatusBar style="dark" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'black',
  },

});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// color: dark["101010"] gray: [242424, 303030]

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{
        color: '#fff',
      }}>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="light" />
      
      <View style={{
        width: 150,
        height: 150,
        backgroundColor: '#222222',
        borderRadius: 20,
      }}>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

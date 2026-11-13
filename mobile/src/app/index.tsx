import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import BridgeCard from '../components/BridgeCard';
import type { Bridge } from '../types/bridge';
export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [bridges, setBridges] = useState<Bridge[]>([]);
  const fetchBridges = async () => {
  try {
    const response = await fetch(
      'http://192.168.0.158:8000/bridges'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch bridge data');
    }

    const data = await response.json();

    setBridges(data.bridges);
  } catch (error) {
    console.error('Error fetching bridges:', error);
  }
};
  const onRefresh = async () => {
  setRefreshing(true);
  await fetchBridges();
  setRefreshing(false);
};
  useEffect(() => {
    fetchBridges();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welland Canal Bridge Status</Text>
      <Text style={styles.subtitle}>Bridge Status</Text>

      <FlatList
  data={bridges}
  keyExtractor={(bridge) => bridge.id}
  renderItem={({ item }) => (
    <BridgeCard bridge={item} />
  )}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  }
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f5f5f5',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 18,
    color: '#666',
  },
  availableDot: {
  backgroundColor: 'green',
},

unavailableDot: {
  backgroundColor: 'red',
},

unknownDot: {
  backgroundColor: 'gray',
},

availableText: {
  color: 'green',
},

unavailableText: {
  color: 'red',
},

unknownText: {
  color: 'gray',
},
});
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import BridgeCard from '../components/BridgeCard';
import type { Bridge, BridgeApiResponse } from '../types/bridge';
export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [bridges, setBridges] = useState<Bridge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const fetchBridges = async () => {
  try {
    setError(null);

    const response = await fetch(
      'https://wellandcanalbridgestatusapp-api.onrender.com/bridges'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch bridge data');
    }

    const data: { bridges: BridgeApiResponse[] } = await response.json();

    setBridges(
      data.bridges.map((bridge) => ({
        id: bridge.id,
        name: bridge.name,
        status: bridge.status,
        statusText: bridge.status_text,
      }))
    );
  } catch (error) {
    console.error('Error fetching bridges:', error);
    setError('Unable to load bridge statuses. Please try again.');
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};
const onRefresh = () => {
  setRefreshing(true);
  fetchBridges();
};
  useEffect(() => {
    fetchBridges();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welland Canal Bridge Status</Text>
{loading ? (
  <View style={styles.messageContainer}>
    <Text style={styles.messageText}>Loading bridge statuses...</Text>
  </View>
) : error && bridges.length === 0 ? (
  <View style={styles.messageContainer}>
    <Text style={styles.messageText}>{error}</Text>

    <Text
      style={styles.retryButton}
      onPress={() => {
        setLoading(true);
        fetchBridges();
      }}
    >
      Try Again
    </Text>
  </View>
) : null}
{error && bridges.length > 0 && (
  <Text style={styles.refreshError}>
    {error}
  </Text>
)}
{!loading && !(error && bridges.length === 0) && (
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
)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f5f5f5',
  },
    messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
    messageText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
    retryButton: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#256b39',
  },
    refreshError: {
    color: '#b45309',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
  },
});
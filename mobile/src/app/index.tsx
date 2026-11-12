import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { Bridge } from '../types/bridge';
export default function HomeScreen() {
  const bridges: Bridge[] = [
  {
    id: 'lakeshore',
    name: 'Lakeshore Road Bridge',
    status: 'AVAILABLE',
    lastUpdated: 'Just now',
  },
  {
    id: 'carlton',
    name: 'Carlton Road Bridge',
    status: 'UNAVAILABLE',
    lastUpdated: '2 minutes ago',
  },
  {
    id: 'glendale',
    name: 'Glendale Road Bridge',
    status: 'UNKNOWN',
    lastUpdated: '5 minutes ago',
  },
];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welland Canal Bridge Status</Text>
      <Text style={styles.subtitle}>Bridge Status</Text>

      <FlatList
        data={bridges}
        keyExtractor={(bridge) => bridge.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.bridgeName}>{item.name}</Text>

            <View style={styles.statusRow}>
              <View
                style={[
                  styles.statusDot,
                  item.status === 'AVAILABLE' && styles.availableDot,
                  item.status === 'UNAVAILABLE' && styles.unavailableDot,
                  item.status === 'UNKNOWN' && styles.unknownDot,
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  item.status === 'AVAILABLE' && styles.availableText,
                  item.status === 'UNAVAILABLE' && styles.unavailableText,
                  item.status === 'UNKNOWN' && styles.unknownText,
                ]}
              >
                {item.status}
              </Text>
            </View>

            <Text style={styles.updated}>
              Last updated: {item.lastUpdated}
            </Text>
          </View>
        )}
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
  card: {
    marginTop: 32,
    backgroundColor: '#333',
    borderRadius: 16,
    padding: 20,
  },
  bridgeName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f5f5f5',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'green',
    marginRight: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  updated: {
    marginTop: 12,
    color: '#888',
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

import { StyleSheet, Text, View } from 'react-native';
import type { Bridge } from '../types/bridge';

type BridgeCardProps = {
  bridge: Bridge;
};

export default function BridgeCard({ bridge }: BridgeCardProps) {
  const statusColor =
    bridge.status === 'AVAILABLE'
      ? '#16a34a'
      : bridge.status === 'UNAVAILABLE'
        ? '#dc2626'
        : '#6b7280';

  return (
    <View style={styles.card}>
      <Text style={styles.bridgeName}>{bridge.name}</Text>

      <View style={styles.statusRow}>
        <View
          style={[styles.statusDot, { backgroundColor: statusColor }]}
        />
        <Text style={[styles.statusText, { color: statusColor }]}>
          {bridge.status}
        </Text>
      </View>

      <Text style={styles.updated}>
        {bridge.statusText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  bridgeName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
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
    marginRight: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  updated: {
    marginTop: 12,
    color: '#888',
  },
});

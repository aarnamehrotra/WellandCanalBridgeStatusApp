
import { StyleSheet, Text, View } from 'react-native';
import type { Bridge } from '../types/bridge';

type BridgeCardProps = {
  bridge: Bridge;
};

export default function BridgeCard({ bridge }: BridgeCardProps) {
  const statusColor =
    bridge.status == 'AVAILABLE'
      ? '#256b39'
      : bridge.status == 'UNAVAILABLE'
        ? '#8e3030'
        : bridge.status == 'RAISING_SOON'
        ? '#936022'
        : '#888';

  return (
    <View style={[styles.card, { backgroundColor: statusColor}]}>
      <Text style={[styles.bridgeName, { borderBottomWidth: 1 }]}>{bridge.name}</Text>

        <Text style={[styles.statusText]}>
          {bridge.statusText}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    borderRadius: 8,
    padding: 15,
  },
  bridgeName: {
    paddingHorizontal: 5,
    paddingBottom: 5,
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusText: {
    paddingHorizontal: 5,
    paddingTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },

});

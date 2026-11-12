export type BridgeStatus = 'AVAILABLE' | 'UNAVAILABLE' | 'RAISING_SOON' | 'MAINTENANCE' | 'UNKNOWN';

export type Bridge = {
  id: string;
  name: string;
  status: BridgeStatus;
  lastUpdated: string;
};
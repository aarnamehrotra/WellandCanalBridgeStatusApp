export type BridgeStatus = 'AVAILABLE' | 'UNAVAILABLE' | 'RAISING_SOON' | 'MAINTENANCE' | 'UNKNOWN';

export type Bridge = {
  id: string;
  name: string;
  status: BridgeStatus;
  statusText: string;
};

export type BridgeApiResponse = {
  id: string;
  name: string;
  status: BridgeStatus;
  status_text: string;
};
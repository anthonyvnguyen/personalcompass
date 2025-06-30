export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface SavedLocation {
  id: string;
  name: string;
  coordinate: Coordinate;
  timestamp: number;
  description?: string;
}

export interface UserLocation {
  coordinate: Coordinate;
  accuracy?: number;
  altitude?: number;
  heading?: number;
  speed?: number;
  timestamp: number;
}

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface LocationPermission {
  granted: boolean;
  canAskAgain: boolean;
}

export interface LocationPermissionStatus {
  granted: boolean;
  canAskAgain: boolean;
  status: 'granted' | 'denied' | 'undetermined';
}

export interface MapMarker {
  id: string;
  coordinate: Coordinate;
  title: string;
  description?: string;
  pinColor?: string;
}

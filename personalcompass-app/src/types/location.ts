export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  heading?: number;
}

export interface LocationPermission {
  granted: boolean;
  canAskAgain: boolean;
}

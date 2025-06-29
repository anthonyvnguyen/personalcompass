export interface CompassHeading {
  magneticHeading: number;
  trueHeading: number;
  accuracy: number;
}

export interface LocationIndicator {
  id: string;
  name: string;
  bearing: number;
  distance: number;
  color: string;
}

export interface CompassCalibration {
  isCalibrated: boolean;
  accuracy: 'low' | 'medium' | 'high';
}

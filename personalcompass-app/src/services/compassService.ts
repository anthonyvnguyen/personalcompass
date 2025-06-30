import { Magnetometer, Accelerometer } from 'expo-sensors';
import { CompassHeading, LocationIndicator } from '../types/compass';
import { SavedLocation, Coordinate } from '../types/location';
import LocationService from './locationService';

export class CompassService {
  private static instance: CompassService;
  private locationService: LocationService;
  private magnetometerSubscription: any = null;
  private accelerometerSubscription: any = null;
  private currentHeading: number = 0;
  private headingListeners: ((heading: number) => void)[] = [];
  private magnetometerData: { x: number; y: number; z: number } | null = null;
  private accelerometerData: { x: number; y: number; z: number } | null = null;

  static getInstance(): CompassService {
    if (!CompassService.instance) {
      CompassService.instance = new CompassService();
    }
    return CompassService.instance;
  }

  constructor() {
    this.locationService = LocationService.getInstance();
  }

  /**
   * Start magnetometer and accelerometer updates for tilt-compensated compass
   */
  async startCompass(
    onHeadingUpdate: (heading: number) => void,
    onError?: (error: string) => void
  ): Promise<boolean> {
    try {
      // Check if both sensors are available
      const magnetometerAvailable = await Magnetometer.isAvailableAsync();
      const accelerometerAvailable = await Accelerometer.isAvailableAsync();

      if (!magnetometerAvailable) {
        onError?.('Magnetometer not available on this device');
        return false;
      }

      if (!accelerometerAvailable) {
        onError?.('Accelerometer not available on this device');
        return false;
      }

      // Set update intervals (every 100ms for smooth updates)
      Magnetometer.setUpdateInterval(100);
      Accelerometer.setUpdateInterval(100);

      // Subscribe to magnetometer updates
      this.magnetometerSubscription = Magnetometer.addListener(data => {
        this.magnetometerData = data;
        this.updateHeading(onHeadingUpdate);
      });

      // Subscribe to accelerometer updates
      this.accelerometerSubscription = Accelerometer.addListener(data => {
        this.accelerometerData = data;
        this.updateHeading(onHeadingUpdate);
      });

      return true;
    } catch (error) {
      console.error('Error starting compass:', error);
      onError?.('Failed to start compass');
      return false;
    }
  }

  /**
   * Stop magnetometer and accelerometer updates
   */
  stopCompass(): void {
    if (this.magnetometerSubscription) {
      this.magnetometerSubscription.remove();
      this.magnetometerSubscription = null;
    }
    if (this.accelerometerSubscription) {
      this.accelerometerSubscription.remove();
      this.accelerometerSubscription = null;
    }
    this.magnetometerData = null;
    this.accelerometerData = null;
  }

  /**
   * Update heading when both sensor data are available
   */
  private updateHeading(onHeadingUpdate: (heading: number) => void): void {
    if (!this.magnetometerData || !this.accelerometerData) {
      return; // Wait for both sensors to have data
    }

    const heading = this.calculateTiltCompensatedHeading(
      this.magnetometerData,
      this.accelerometerData
    );

    this.currentHeading = heading;
    onHeadingUpdate(heading);

    // Notify all listeners
    this.headingListeners.forEach(listener => listener(heading));
  }

  /**
   * Calculate tilt-compensated heading from magnetometer and accelerometer data
   */
  private calculateTiltCompensatedHeading(
    mag: { x: number; y: number; z: number },
    acc: { x: number; y: number; z: number }
  ): number {
    // Normalize the accelerometer vector
    const accMagnitude = Math.sqrt(
      acc.x * acc.x + acc.y * acc.y + acc.z * acc.z
    );
    if (accMagnitude === 0) {
      // Fallback to simple calculation if accelerometer data is invalid
      let heading = Math.atan2(mag.y, mag.x) * (180 / Math.PI);
      return this.smoothHeading((heading + 360) % 360);
    }

    const accX = acc.x / accMagnitude;
    const accY = acc.y / accMagnitude;
    const accZ = acc.z / accMagnitude;

    // Calculate pitch and roll
    const pitch = Math.asin(-accX);
    const roll = Math.atan2(-accY, -accZ);

    // Tilt compensation calculations
    const magXComp = mag.x * Math.cos(pitch) + mag.z * Math.sin(pitch);
    const magYComp =
      mag.x * Math.sin(roll) * Math.sin(pitch) +
      mag.y * Math.cos(roll) -
      mag.z * Math.sin(roll) * Math.cos(pitch);

    // Calculate heading from compensated magnetometer values
    let heading = Math.atan2(-magYComp, magXComp) * (180 / Math.PI);

    // Normalize to 0-360 degrees
    heading = (heading + 360) % 360;

    // Apply smoothing to reduce jitter
    return this.smoothHeading(heading);
  }

  /**
   * Apply simple smoothing to reduce compass jitter
   */
  private smoothHeading(newHeading: number): number {
    if (this.currentHeading === 0) {
      return newHeading;
    }

    // Handle the 360/0 degree boundary
    let diff = newHeading - this.currentHeading;
    if (diff > 180) {
      diff -= 360;
    } else if (diff < -180) {
      diff += 360;
    }

    // Apply simple low-pass filter (adjust alpha for more/less smoothing)
    const alpha = 0.15;
    const smoothedDiff = diff * alpha;
    let smoothedHeading = this.currentHeading + smoothedDiff;

    // Normalize to 0-360 degrees
    smoothedHeading = (smoothedHeading + 360) % 360;

    return smoothedHeading;
  }

  /**
   * Get current compass heading
   */
  getCurrentHeading(): number {
    return this.currentHeading;
  }

  /**
   * Calculate location indicators for saved locations
   */
  async calculateLocationIndicators(
    userLocation: Coordinate
  ): Promise<LocationIndicator[]> {
    try {
      const savedLocations = await this.locationService.getSavedLocations();
      const indicators: LocationIndicator[] = [];

      // Generate color palette for indicators
      const colors = this.generateIndicatorColors(savedLocations.length);

      savedLocations.forEach((location, index) => {
        const bearing = this.locationService.calculateBearing(
          userLocation,
          location.coordinate
        );
        const distance = this.locationService.calculateDistance(
          userLocation,
          location.coordinate
        );

        indicators.push({
          id: location.id,
          name: location.name,
          bearing,
          distance: Math.round(distance),
          color: colors[index % colors.length],
        });
      });

      return indicators;
    } catch (error) {
      console.error('Error calculating location indicators:', error);
      return [];
    }
  }

  /**
   * Generate distinct colors for location indicators
   */
  private generateIndicatorColors(count: number): string[] {
    const baseColors = [
      '#FF6B6B', // Red
      '#4ECDC4', // Teal
      '#45B7D1', // Blue
      '#96CEB4', // Green
      '#FECA57', // Yellow
      '#FF9FF3', // Pink
      '#54A0FF', // Light Blue
      '#5F27CD', // Purple
      '#00D2D3', // Cyan
      '#FF9F43', // Orange
    ];

    // If we need more colors than base colors, repeat the pattern
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(baseColors[i % baseColors.length]);
    }

    return colors;
  }

  /**
   * Add a listener for heading updates
   */
  addHeadingListener(listener: (heading: number) => void): () => void {
    this.headingListeners.push(listener);

    // Return unsubscribe function
    return () => {
      const index = this.headingListeners.indexOf(listener);
      if (index > -1) {
        this.headingListeners.splice(index, 1);
      }
    };
  }

  /**
   * Get compass accuracy/calibration status
   */
  async getCompassAccuracy(): Promise<'low' | 'medium' | 'high'> {
    // This is a simplified implementation
    // In a production app, you might want to implement more sophisticated calibration detection
    return 'medium';
  }

  /**
   * Calculate relative bearing (bearing relative to current heading)
   */
  calculateRelativeBearing(absoluteBearing: number): number {
    let relativeBearing = absoluteBearing - this.currentHeading;

    // Normalize to -180 to 180 degrees
    if (relativeBearing > 180) {
      relativeBearing -= 360;
    } else if (relativeBearing < -180) {
      relativeBearing += 360;
    }

    return relativeBearing;
  }
}

export default CompassService;

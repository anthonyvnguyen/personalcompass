import { Magnetometer } from 'expo-sensors';
import { CompassHeading, LocationIndicator } from '../types/compass';
import { SavedLocation, Coordinate } from '../types/location';
import LocationService from './locationService';

export class CompassService {
  private static instance: CompassService;
  private locationService: LocationService;
  private magnetometerSubscription: any = null;
  private currentHeading: number = 0;
  private headingListeners: ((heading: number) => void)[] = [];

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
   * Start magnetometer updates
   */
  async startCompass(
    onHeadingUpdate: (heading: number) => void,
    onError?: (error: string) => void
  ): Promise<boolean> {
    try {
      // Check if magnetometer is available
      const isAvailable = await Magnetometer.isAvailableAsync();
      if (!isAvailable) {
        onError?.('Magnetometer not available on this device');
        return false;
      }

      // Set update interval (every 100ms for smooth updates)
      Magnetometer.setUpdateInterval(100);

      // Subscribe to magnetometer updates
      this.magnetometerSubscription = Magnetometer.addListener(data => {
        // Calculate heading from magnetometer data
        const heading = this.calculateHeading(data.x, data.y, data.z);
        this.currentHeading = heading;
        onHeadingUpdate(heading);

        // Notify all listeners
        this.headingListeners.forEach(listener => listener(heading));
      });

      return true;
    } catch (error) {
      console.error('Error starting compass:', error);
      onError?.('Failed to start compass');
      return false;
    }
  }

  /**
   * Stop magnetometer updates
   */
  stopCompass(): void {
    if (this.magnetometerSubscription) {
      this.magnetometerSubscription.remove();
      this.magnetometerSubscription = null;
    }
  }

  /**
   * Calculate heading from magnetometer data
   */
  private calculateHeading(x: number, y: number, z: number): number {
    // Calculate heading from x and y components
    let heading = Math.atan2(y, x) * (180 / Math.PI);

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

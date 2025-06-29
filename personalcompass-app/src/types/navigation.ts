export type RootStackParamList = {
  Map: undefined;
  Compass: undefined;
  Settings: undefined;
};

export type TabParamList = {
  MapTab: undefined;
  CompassTab: undefined;
  SettingsTab: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

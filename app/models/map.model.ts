export interface MapData {
  lat: number;
  lon: number;
  timezone: string;
  updateCoords: (lat: number, lon: number) => void;
}

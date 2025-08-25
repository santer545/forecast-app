import { create } from 'zustand';
import { MapData } from '../models/map.model';

const initialState: MapData = {
  lat: 49.866198,
  lon: 24.005666,
  timezone: 'Europe/Kyiv',
  updateCoords: () => {},
};

export const useMapStore = create<MapData>((set) => ({
  lat: initialState.lat,
  lon: initialState.lon,
  timezone: initialState.timezone,
  updateCoords: (lat: number, lon: number) => set({ lat, lon }),
}));

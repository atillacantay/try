export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  district: string;
  city: string;
  country: string;
  formatted_address: string;
  place_id: string;
  coordinates: Coordinates;
  geohash: string;
}

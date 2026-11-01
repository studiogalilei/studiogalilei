import type { Feature, FeatureCollection, Geometry } from "geojson";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import atlas from "./countries-110m.json";

const topology = atlas as unknown as Topology<{
  countries: GeometryCollection;
}>;

/** world-atlas 110m countries as GeoJSON features (ids are ISO 3166-1 numeric codes). */
export const countries = (
  feature(topology, topology.objects.countries) as FeatureCollection<Geometry>
).features as Feature<Geometry>[];

/** Places Studio Galilei has worked in; `country` highlights the whole country on the maps. */
export const workedIn = [
  { key: "turkey", lon: 35.2, lat: 39, country: "792" },
  { key: "switzerland", lon: 8.2, lat: 46.8, country: "756" },
  { key: "netherlands", lon: 5.3, lat: 52.2, country: "528" },
  { key: "belarus", lon: 27.9, lat: 53.7, country: "112" },
  { key: "texas", lon: -99.9, lat: 31.5 },
  { key: "italy", lon: 12.6, lat: 42.6, country: "380" },
] as const;

import { Store } from "redux";
import mapboxgl from "mapbox-gl";
import { OnClickCallback } from "Interfaces/Types";

export class MapboxMapService {
  private _store: Store;
  private _map: mapboxgl.Map;
  constructor(dataStore: Store) {
    this._store = dataStore;
  }

  public init(container: HTMLElement): mapboxgl.Map {
    const { zoom, center } = this._store.getState();

    this._map = new mapboxgl.Map({
      container: container,
      style: "mapbox://styles/mapbox/streets-v11",
      center: center.reverse(),
      zoom: zoom,
    });

    this._addGeoJSONToMap();
    this._addTerrainToMap();

    return this._map;
  }

  private _addTerrainToMap(): void {
    this._map.on("load", () => {
      this._map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      this._map.setTerrain({ source: "mapbox-dem", exaggeration: 2.1 });
      this._map.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 0.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });
    });
  }

  private _addGeoJSONToMap(): void {
    const geoJSON = this._store.getState().data.map_track;

    this._map.on("load", () => {
      this._map.addSource("mainTrack", {
        type: "geojson",
        data: geoJSON,
      });

      this._map.addLayer({
        id: "mainTrack",
        type: "line",
        source: "mainTrack",
        layout: {},
        paint: {
          "line-width": 3,
          "line-color": "blue",
        },
      });
    });
  }

  public setOnClick(callback: OnClickCallback): void {
    this._map.on("click", callback);
  }

  public get map(): mapboxgl.Map {
    return this._map;
  }
}

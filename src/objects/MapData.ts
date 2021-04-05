import { IMapData, MapDataStats } from "Interfaces/IMapData";

export class MapData {
  _resource: IMapData;
  _geoJsonTrack: JSON;

  constructor(mapData: IMapData, track: JSON) {
    this._resource = mapData;
    this._geoJsonTrack = track;
  }

  get filters(): Array<{ type: string }> {
    const filters = [];
    this._resource.default_filters.forEach((filter) =>
      filters.push(filter.type)
    );
    return filters;
  }

  get defaultImage(): string {
    return this._resource.default_image;
  }

  get name(): string {
    return this._resource.name
  }

  get id(): number {
    return this._resource.id;
  }

  get alias(): string {
    return this._resource.alias;
  }

  get blurb(): string {
    return this._resource.blurb;
  }

  get stats(): MapDataStats {
    return this._resource.stats;
  }

  get track(): any {
    return this._geoJsonTrack;
  }

  get type(): string {
    return this._resource.type;
  }

  get startPoint(): { lat: number; lng: number } {
    return {
      lat: this._resource.start_point_lat,
      lng: this._resource.start_point_lng,
    };
  }

  get zoomLevel(): number {
    return this._resource.zoom_level;
  }
}

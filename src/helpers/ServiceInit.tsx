import React from "react";
import { Store } from "redux";
import { MapInitialiser } from "services/MapInitialiser";
import { MarkerAddService } from "services/MarkerAdd";
import { MapboxMapService } from "services/MapboxMap";

export interface Context {
  mapInitialiser: MapInitialiser;
  markerAdd: MarkerAddService;
  mapBoxMapService: MapboxMapService;
}

export interface IServices {
  mapInitialiser: MapInitialiser;
  markerAdd: MarkerAddService;
  mapBoxMapService: MapboxMapService;
}

export class Services {
  private _services: IServices;
  private _dataStore: Store;

  constructor(dataStore: Store) {
    this._dataStore = dataStore;
    this._services = {
      mapInitialiser: new MapInitialiser(this._dataStore),
      mapBoxMapService: new MapboxMapService(this._dataStore),
      markerAdd: new MarkerAddService(this._dataStore),
    };
  }

  public getServices(): IServices {
    return this._services;
  }
}

export const ServicesContext = React.createContext({});

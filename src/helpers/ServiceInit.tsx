import React from "react";
import { Store } from "redux";
import { MapInitialiser } from "services/MapInitialiser";

export interface Context {
  mapInitialiser: MapInitialiser;
}

export class Services {
  private _services: any;
  private _dataStore: Store;

  constructor(dataStore: Store) {
    this._dataStore = dataStore;
    this._services = {
      mapInitialiser: new MapInitialiser(this._dataStore),
    };
  }

  public getServices() {
    return this._services;
  }
}

export const ServicesContext = React.createContext({});

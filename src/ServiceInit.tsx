import React from "react";
import { MapInitialiser } from "services/MapInitialiser";
import { Store } from "redux";

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

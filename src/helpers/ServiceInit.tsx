import React from "react";
import { Store } from "redux";
import { MapInitialiser } from "services/MapInitialiser";
import { MarkerAddService } from "services/MarkerAdd";
import { MapboxMapService } from "services/MapboxMap";
import { MapboxMarkerService } from "services/MapboxMarker";
import {
  IObservable,
  Observable,
  ObserverWithInitialNotify,
} from "helpers/Observer";

export interface Context {
  mapInitialiser: MapInitialiser;
  markerAdd: MarkerAddService;
  mapBoxMapService: MapboxMapService;
  mapboxMarkerAdd: MapboxMarkerService;
  servicesReady: (fn: () => void) => void;
}

export interface IServices {
  mapInitialiser: MapInitialiser;
  markerAdd: MarkerAddService;
  mapBoxMapService: MapboxMapService;
  mapboxMarkerAdd: MapboxMarkerService;
  servicesReady: (fn: () => void) => void;
}

export class Services {
  private _services: IServices;
  private _dataStore: Store;
  private _observer: IObservable;

  constructor(dataStore: Store) {
    this._dataStore = dataStore;
    this._observer = new ObserverWithInitialNotify();

    this._services = {
      mapInitialiser: new MapInitialiser(this._dataStore),
      markerAdd: new MarkerAddService(this._dataStore),
      mapBoxMapService: new MapboxMapService(this._dataStore),
      mapboxMarkerAdd: new MapboxMarkerService(),
      servicesReady: (fn) => {
        return this.servicesReady(fn);
      },
    };

    this._services.mapBoxMapService.subscribeToMapReady((map) =>
      this.initWithMap(map)
    );
  }

  public initWithMap(map: mapboxgl.Map): void {
    this._services.mapboxMarkerAdd.init(map);
    this._observer.publish();
  }

  public getServices(): IServices {
    return this._services;
  }

  public servicesReady(fn: () => void): void {
    this._observer.subscribe(fn);
  }
}

export const ServicesContext = React.createContext({});

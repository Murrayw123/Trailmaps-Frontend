import { Store } from "redux";
import {
  fetchData,
  fetchMarkers,
  fetchOtherMaps,
  fetchTrailUsers,
} from "redux/actions";
import { Dispatch } from "helpers/types";

export class MapInitialiser {
  private readonly _store: Store;
  private _interval: any;

  constructor(store: Store) {
    this._store = store;
    this._interval = null;
  }

  public init() {
    const currentMap = window.location.pathname.substring(6);

    (this._store.dispatch as Dispatch)(fetchData(currentMap));
    (this._store.dispatch as Dispatch)(fetchMarkers(currentMap));
    (this._store.dispatch as Dispatch)(fetchOtherMaps());
    (this._store.dispatch as Dispatch)(fetchTrailUsers(currentMap));

    this._interval = setInterval(
      () => (this._store.dispatch as Dispatch)(fetchTrailUsers(currentMap)),
      20000
    );
  }

  public destroy() {
    clearInterval(this._interval);
  }
}

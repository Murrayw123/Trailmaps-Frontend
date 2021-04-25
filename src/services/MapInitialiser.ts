import { Store } from "redux";
import { Dispatch } from "helpers/types";
import {
  fetchInitialMapData,
  fetchMarkers,
  fetchOtherMaps,
  fetchTrailUsers,
} from "redux/requests";

interface ThunkStore extends Store {
  dispatch: Dispatch;
}

export class MapInitialiser {
  private readonly _store: ThunkStore;
  private _interval: number;
  private _initialised: boolean;

  constructor(store: Store) {
    this._store = store;
    this._interval = null;
    this._initialised = false;
  }

  public async init(map: string): Promise<void> {
    if (!this._initialised) {
      await this._store.dispatch(fetchInitialMapData(map));
      await this._store.dispatch(fetchMarkers(map));
      await this._store.dispatch(fetchOtherMaps());
      await this._store.dispatch(fetchTrailUsers(map));
      this._interval = window.setInterval(
        () => (this._store.dispatch as Dispatch)(fetchTrailUsers(map)),
        20000
      );
      this._initialised = true;
    }
  }

  public destroy(): void {
    clearInterval(this._interval);
  }
}

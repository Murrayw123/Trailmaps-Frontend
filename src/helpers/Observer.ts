export interface IObservable {
  subscribe: (cb: () => void) => void;
  unsubscribe: (cb: () => void) => void;
  publish: (data?: unknown) => unknown;
}
export class Observable implements IObservable {
  private subscribers = [];

  public subscribe(cb: unknown): void {
    this.subscribers.push(cb);
  }
  public unsubscribe(cb: unknown): void {
    this.subscribers = this.subscribers.filter((el) => {
      return el !== cb;
    });
  }

  public publish(data?: unknown): void {
    return this.subscribers.forEach((subscriber) => {
      subscriber(data);
    });
  }
}

export class ObserverWithInitialNotify implements IObservable {
  private _subscribers = [];
  private _published = false;
  private _publishedData: unknown = false;

  public subscribe(cb: (data?) => void): void {
    this._subscribers.push(cb);
    if (this._published) {
      cb(this._publishedData);
    }
  }
  public unsubscribe(cb: unknown): void {
    this._subscribers = this._subscribers.filter((el) => {
      return el !== cb;
    });
  }

  public publish(data?: unknown): void {
    this._published = true;
    this._publishedData = data;
    return this._subscribers.forEach((subscriber) => {
      subscriber(data);
    });
  }
}

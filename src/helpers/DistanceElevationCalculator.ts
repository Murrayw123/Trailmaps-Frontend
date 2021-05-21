import { distance } from "@turf/turf";

export type Path = Array<[lng: number, lat: number, height: number]>;

export interface ChartData {
  elevation: number;
  coords: [number, number];
  distance: number;
}

export interface PathAndElevation {
  distance: number;
  chartData: Array<ChartData>;
  elevationGain: number;
  elevationLoss: number;
}

enum P {
  lat,
  lng,
  elevation,
}

const MINIMUM_ELEVATION_CHANGE = 5;

/* 
Calculate distance and elevation. The minimum elevation change we care about is 5m. As we sum up the distance,
keep checking the elevation point of the current path point. As soon as it goes above 5m compared to our
reference point, reset the reference point and add the elevation to either loss or gain.  
 */
export class DistanceElevationCalculator {
  private _path: Path;
  private _elevationGain: number;
  private _elevationLoss: number;
  private _chartData: Array<ChartData>;
  private _customDistance: number;
  private _elevationReferencePoint: number;

  constructor(path: Path) {
    this._path = path;
    this._elevationGain = 0;
    this._elevationLoss = 0;
    this._chartData = [];
    this._customDistance = 0;
    this._elevationReferencePoint = 0;
  }

  public calculatePathAndElevation(): PathAndElevation {
    if (this._pathValid()) {
      this._calculatePath();
    }
    return {
      distance: this._customDistance,
      chartData: this._chartData,
      elevationGain: this._elevationGain,
      elevationLoss: this._elevationLoss,
    };
  }

  private _calculatePath() {
    let i;
    for (i = 0; i < this._path.length; i++) {
      if (i === 0) {
        this._customDistance = 0;
        this._chartData.push({
          elevation: this._path[i][P.elevation],
          distance: this._customDistance,
          coords: [this._path[i][P.lng], this._path[i][P.lat]],
        });
      } else {
        this._customDistance += distance(this._path[i - 1], this._path[i]);
        this._calculateElevation(i);
        this._chartData.push({
          elevation: this._path[i][P.elevation],
          distance: parseFloat(this._customDistance.toFixed(3)),
          coords: [
            parseFloat(this._path[i][1].toFixed(4)),
            parseFloat(this._path[i][0].toFixed(4)),
          ],
        });
      }
    }
  }

  private _calculateElevation(currentIteration: number) {
    const elevationChange =
      this._path[this._elevationReferencePoint][P.elevation] -
      this._path[currentIteration][P.elevation];
    if (_elevationHasChangedEnough(elevationChange)) {
      this._accumulateLossOrGain(elevationChange);
      this._elevationReferencePoint = currentIteration;
    }
  }

  private _accumulateLossOrGain(elevationChange: number) {
    if (_isElevationGain(elevationChange)) {
      this._elevationGain += Math.abs(elevationChange);
    } else {
      this._elevationLoss += Math.abs(elevationChange);
    }
  }

  private _pathValid() {
    return this._path.length;
  }
}

function _isElevationGain(elevationChange: number): boolean {
  return elevationChange < 0; // old elevation: 300m - new elevation 305m = -5m
}

function _elevationHasChangedEnough(elevationChange: number): boolean {
  return Math.abs(elevationChange) >= MINIMUM_ELEVATION_CHANGE;
}

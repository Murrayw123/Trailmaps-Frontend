import { DistanceElevationCalculator } from "helpers/DistanceElevationCalculator";
import { testPath } from "helpers/tests/testData";

describe("PathCalculator", () => {
  let pathCalculator: DistanceElevationCalculator;

  beforeEach(() => {
    pathCalculator = new DistanceElevationCalculator(testPath);
  });

  it("Calculates a path: distance", () => {
    const res = pathCalculator.calculatePathAndElevation();
    expect(res.distance).toBe(3.4255909669303);
  });

  it("Calculates a path: Elevation", () => {
    const res = pathCalculator.calculatePathAndElevation();
    expect(res.elevationGain).toBe(12.170000000000016);
    expect(res.elevationLoss).toBe(21.829999999999984);
  });
});

export {};

import { server } from "./mock-api/server";
import renderer from "react-test-renderer";
import React from "react";
import { Provider } from "react-redux";
import MapParent from "../components/MapParent";
import { store } from "../store";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("should load some markers", () => {
  test("regular markers", () => {
    const component = renderer.create(
      <Provider store={store}>
        <MapParent pathName="mundabiddi" />
      </Provider>
    );
  });
});

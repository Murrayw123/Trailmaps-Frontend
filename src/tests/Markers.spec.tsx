import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { applyMiddleware, createStore, Store } from "redux";
import dataReducer from "redux/reducers";
import thunk from "redux-thunk";
import { Services, ServicesContext } from "helpers/ServiceInit";
import { Provider } from "react-redux";
import { MapHOC } from "components/MapParent";
import { server } from "tests/mock-api/server";
describe("should load some markers", () => {
  let store: Store;
  let services: Services;

  beforeAll(() => {
    configure({ adapter: new Adapter() });
    store = createStore(dataReducer, applyMiddleware(thunk));
    services = new Services(store);
    server.listen();
  });

  beforeEach(async () => {
    const { mapInitialiser } = services.getServices();
    await mapInitialiser.init("mundabiddi");
  });

  test("regular markers", async () => {
    const component = mount(
      <ServicesContext.Provider value={services.getServices()}>
        <Provider store={store}>
          <MapHOC />
        </Provider>
      </ServicesContext.Provider>
    );
    const markers = component.find("PoiMarker");
    expect(markers.length).toBeTruthy();
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
});

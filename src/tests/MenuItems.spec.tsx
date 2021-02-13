import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { applyMiddleware, createStore, Store } from "redux";
import dataReducer from "../redux/reducers";
import thunk from "redux-thunk";
import { Services, ServicesContext } from "helpers/ServiceInit";
import { Provider } from "react-redux";
import { MapHOC } from "components/MapParent";
import { server } from "tests/mock-api/server";

describe("should load some markers", () => {
  let store: Store;
  let services: Services;

  beforeAll(() => {
    console.error = () => {};
    configure({ adapter: new Adapter() });
    store = createStore(dataReducer, applyMiddleware(thunk));
    services = new Services(store);
    server.listen();
  });

  beforeEach(async () => {
    const { mapInitialiser } = services.getServices();
    await mapInitialiser.init("mundabiddi");
  });

  test("Displayed Filter Options", async () => {
    const component = mount(
      <ServicesContext.Provider value={services.getServices()}>
        <Provider store={store}>
          <MapHOC />
        </Provider>
      </ServicesContext.Provider>
    );
    const filterDropdown = component.find(".filter-option").first();
    console.log(filterDropdown.debug());
    filterDropdown.simulate("click");
    filterDropdown.update();

    console.log("poop!");

    // expect(component.text()).toContain("town");

    // console.log(filterDropdown.find(".filters-checkbox").debug());
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
});

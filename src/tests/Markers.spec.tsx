// import React from "react";
// import { Provider } from "react-redux";
// import { configure, mount } from "enzyme";
// import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// import { setupServer } from "msw/node";
// import { rest } from "msw";
// import { applyMiddleware, createStore } from "redux";
// import dataReducer from "../redux/reducers";
// import thunk from "redux-thunk";
// import { MapParent } from "components/MapParent";
//
// const server = setupServer(
//   rest.get("/api/maps/mundabiddi", (req, res, ctx) => {
//     return res(ctx.json({ firstName: "John", age: 38 }));
//   })
// );
//
// let store;
//
// beforeAll(() => {
//   configure({ adapter: new Adapter() });
//   store = createStore(dataReducer, applyMiddleware(thunk));
//   server.listen();
// });
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
//
// describe("should load some markers", () => {
//   test("regular markers", async () => {
//     const component = await mount(
//       <Provider store={store}>
//         <MapParent pathName="mundabiddi" />
//       </Provider>
//     );
//
//     setTimeout(() => {
//       console.log("timing out!");
//     }, 3000);
//   });
// });

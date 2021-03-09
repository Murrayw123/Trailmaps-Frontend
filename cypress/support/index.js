beforeEach(() => {
  cy.intercept("GET", "/api/maps/mundabiddi", { fixture: "mundabiddi.json" });
  cy.intercept("GET", "/api/markers*", { fixture: "markers.json" });
  cy.intercept("POST", "/api/submit_marker/*", {});
  cy.intercept("GET", "/api/map_preview", { fixture: "map_preview.json" });
  cy.intercept("GET", "/api/spotuserswithlocation", []);

  cy.intercept("GET", "http://localhost:3000/api/maps/mundabiddi", {
    fixture: "mundabiddi.json",
  });
  cy.intercept("GET", "http://localhost:3000/api/markers*", {
    fixture: "markers.json",
  });
  cy.intercept("POST", "http://localhost:3000/api/submit_marker/*", {});
  cy.intercept("GET", "http://localhost:3000/api/map_preview", {
    fixture: "map_preview.json",
  });
  cy.intercept("GET", "http://localhost:3000/api/spotuserswithlocation", []);
});

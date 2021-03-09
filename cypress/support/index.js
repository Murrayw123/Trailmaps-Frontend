beforeEach(() => {
  cy.intercept("GET", "/api/maps/mundabiddi", { fixture: "mundabiddi.json" });
  cy.intercept("GET", "/api/markers*", { fixture: "markers.json" });
  cy.intercept("POST", "/api/submit_marker/*", {});
  cy.intercept("GET", "/api/map_preview", { fixture: "map_preview.json" });
  cy.intercept("GET", "/api/spotuserswithlocation", []);

  cy.intercept("GET", "/api/maps/mundabiddi", { fixture: "mundabiddi.json" });
  cy.intercept("GET", "/api/markers*", { fixture: "markers.json" });
  cy.intercept("POST", "/api/submit_marker/*", {});
  cy.intercept("GET", "/api/map_preview", { fixture: "map_preview.json" });
  cy.intercept("GET", "/api/spotuserswithlocation", []);

  cy.intercept("GET", "https://trailmaps.site/api/maps/mundabiddi", {
    fixture: "mundabiddi.json",
  });
  cy.intercept("GET", "https://trailmaps.site/api/markers*", {
    fixture: "markers.json",
  });
  cy.intercept("POST", "https://trailmaps.site/api/submit_marker/*", {});
  cy.intercept("GET", "https://trailmaps.site/api/map_preview", {
    fixture: "map_preview.json",
  });
  cy.intercept("GET", "https://trailmaps.site/api/spotuserswithlocation", []);
});

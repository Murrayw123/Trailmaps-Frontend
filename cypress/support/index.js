beforeEach(() => {
  cy.intercept("GET", "/api/maps/mundabiddi", { fixture: "mundabiddi.json" });
  cy.intercept("GET", "/api/markers*", { fixture: "markers.json" });
  cy.intercept("POST", "/api/submit_marker/*", {});
  cy.intercept("GET", "/api/map_preview", { fixture: "map_preview.json" });
  cy.intercept("GET", "/api/spot_users_with_location", []);
  cy.intercept("GET", "https://trailmaps-geojson.s3-ap-southeast-2.amazonaws.com/mundabiddi.geojson", { fixture: "mundabiddi_track.json" });
});

import { TEST_PORT } from "./config";

describe("maps: ", () => {
  it("Munda Biddi - should display only towns or huts", () => {
    cy.visit(`http://0.0.0.0:${TEST_PORT}/maps/mundabiddi`);

    cy.get(".mapboxgl-marker").should("satisfy", ($el) => {
      const classList = Array.from($el[0].classList);
      return classList.includes("hut") || classList.includes("town");
    });
  });

  it("should load a context menu on right click", () => {
    cy.visit(`http://0.0.0.0:${TEST_PORT}/maps/mundabiddi`);
    const map = cy.get(".mapboxgl-canvas");
    map.rightclick();

    const contextMenu = cy.get(".context-menu");
    expect(contextMenu).to.exist;
  });
});

export {};

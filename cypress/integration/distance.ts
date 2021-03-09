describe("distance calculator: ", () => {
  beforeEach(() => {
    cy.visit("http://0.0.0.0:80/maps/mundabiddi");

    cy.get(".mundaring").click();
    cy.get(".startFlag").click();
    cy.get(".mapboxgl-popup-close-button").click();

    cy.get(".jarrahdale").click();
    cy.get(".endFlag").click();
    cy.get(".mapboxgl-popup-close-button").click();

    cy.get(".distance-calc-button").click();
  });

  it("should calculate distance correctly", () => {
    cy.get(".distance-calculator")
      .find(".ant-card-body")
      .should("contain.text", "102.94");
  });

  it("should bring up an interactive elevation chart", () => {
    cy.get(".recharts-surface").trigger("mouseover").click();
    cy.get(".distancemarker").should("be.visible");
  });
});

export {};

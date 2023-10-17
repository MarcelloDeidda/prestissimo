Cypress.Commands.add("getCyData", data => {
    return cy.get(`[data-cy=${data}]`);
});
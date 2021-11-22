/// <reference types="cypress" />

describe('Unauthorized user should be redirected to route /', () => {
  it('should be redirect to route /', () => {
    cy.visit('http://localhost:3000/subscription');

    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('should be redirect to route /', () => {
    cy.visit('http://localhost:3000/subscribe');

    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('should be redirect to route /', () => {
    cy.visit('http://localhost:3000/subscription-details');

    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('should be redirect to route /', () => {
    cy.visit('http://localhost:3000/feedback');

    cy.url().should('equal', 'http://localhost:3000/');
  });
});

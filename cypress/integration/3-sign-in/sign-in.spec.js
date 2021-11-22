/// <reference types="cypress" />
import faker from 'faker';

describe('Registered user should be able to sign-in', () => {
  it('should be able to visit route /sign-in', () => {
    cy.visit('http://localhost:3000/sign-in');

    cy.url().should('equal', 'http://localhost:3000/sign-in');
  });

  it('should be able to write information on the inputs', () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    cy.visit('http://localhost:3000/sign-in');
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(password);

    cy.get('input[type=email]').invoke('val').should('equal', email);
    cy.get('input[type=password]').invoke('val').should('equal', password);
  });

  it('should successfully sign-in', () => {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    cy.visit('http://localhost:3000/sign-up');
    cy.get('input[type=text]').type(name);
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').first().type(password);
    cy.get('input[type=password]').last().type(password);
    cy.get('button').contains('Cadastrar').click();
    cy.wait(1000);

    cy.visit('http://localhost:3000/sign-in');
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(password);
    cy.get('button').contains('Login').click();
    cy.url().should('equal', 'http://localhost:3000/subscription');
  });
});

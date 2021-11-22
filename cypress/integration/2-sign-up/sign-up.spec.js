/// <reference types="cypress" />
import faker from 'faker';

describe('Visitant should be able to sign-up', () => {
  it('should be able to visit route /sign-up', () => {
    cy.visit('http://localhost:3000/sign-up');

    cy.url().should('equal', 'http://localhost:3000/sign-up');
  });

  it('should be able to write information on the inputs', () => {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    cy.visit('http://localhost:3000/sign-up');
    cy.get('input[type=text]').type(name);
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').first().type(password);
    cy.get('input[type=password]').last().type(password);

    cy.get('input[type=text]').invoke('val').should('equal', name);
    cy.get('input[type=email]').invoke('val').should('equal', email);
    cy.get('input[type=password]')
      .first()
      .invoke('val')
      .should('equal', password);
    cy.get('input[type=password]')
      .last()
      .invoke('val')
      .should('equal', password);
  });

  //   it('should successfully sign-up', () => {
  //     const name = faker.name.findName();
  //     const email = faker.internet.email();
  //     const password = faker.internet.password();
  //     cy.visit('http://localhost:3000/sign-up');
  //     cy.get('input[type=text]').type(name);
  //     cy.get('input[type=email]').type(email);
  //     cy.get('input[type=password]').first().type(password);
  //     cy.get('input[type=password]').last().type(password);
  //     cy.get('button').contains('Cadastrar').click();

  //     cy.url().should('equal', 'http://localhost:3000/sign-in');
  //   });
});

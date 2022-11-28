/// <reference types="cypress" />

describe('Testing Home Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Check the home page title', () => {
        cy.get('.page-title span')
          .should('have.text', 'Select Term');
    });

    it('Check navbar elements', () => {
        cy.get('nav a')
          .should('have.length', 5)
          .first()
          .should('have.text', 'My Class Schedule');
        cy.get('nav a')
          .last()
          .should('have.text', 'Term Information');
    });

    it('Check the redirection to shopping cart', () => {
        cy.get('#fall-2022-btn')
          .click();
        cy.url()
          .should('be.equal', 'http://localhost:3000/shopping-cart');
        cy.get('.page-title')
          .should('have.text', 'Shopping Cart');
    });

    it('Check the internationalization to French', () => {
        cy.get('#languageIcon')
          .click();
        cy.get('.page-title span')
          .should('have.text', 'Sélectionnez un trimestre');
    });
});
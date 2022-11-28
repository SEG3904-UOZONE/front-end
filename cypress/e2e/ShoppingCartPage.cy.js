/// <reference types="cypress" />

describe('Testing Shopping Cart Page', () => {
    
    context('Test Shopping Cart components', () => {
        beforeEach(() => {
            cy.visit('http://localhost:3000/');
            cy.get('#fall-2022-btn')
              .click();
        });
    
        it('Check the shopping cart page title', () => {
            cy.get('.page-title')
              .should('have.text', 'Shopping Cart');
        });
    
        it('Check that the search compoennt exist', () => {
            cy.get('.add-course-search > div')
              .should('have.length', 3);
        });
    });

    context('Test changing term', () => {
        it('Open the Shopping Cart page',() => {
            cy.visit('http://localhost:3000/');
            cy.get('#fall-2022-btn')
              .click();
        });
    
        it('Check the current term', () => {
            cy.get('#changeTermComponent h4')
              .should('have.text', 'FALL 2022 Term');
        });
    
        it('Check redirection to home page', () => {
            cy.get('.change-term-btn')
              .click();
            cy.url()
              .should('be.equal', 'http://localhost:3000/');
        });

        it('Click on the Winter 2023 term', ()=> {
            cy.get('#winter-2023-btn')
              .click();
        });

        it('Check the new term', () => {
            cy.get('#changeTermComponent h4')
              .should('have.text', 'WINTER 2023 Term');
        });
    });

});
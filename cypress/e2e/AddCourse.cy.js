/// <reference types="cypress" />

describe('Test adding a course to shopping cart', () => {
    
    it('Select a term', () => {
        cy.visit('http://localhost:3000/');
        cy.get('#fall-2022-btn')
          .click();
        cy.url()
          .should('be.equal', 'http://localhost:3000/shopping-cart');
    });

    it('Navigate to the search course page', () => {
        cy.get('.free-search .search-course-btn')
          .click()
        cy.url()
          .should('be.equal', 'http://localhost:3000/search-course');
    });

    it('Insert course info', () => {
        cy.get('#subjectInpu')
          .click()
          .type('GEO');
        cy.get('#courseNumberInput')
          .click()
          .type('1111');
        cy.url()
          .should('be.equal', 'http://localhost:3000/search-course');
    });

    it('Search for the course', () => {
        cy.get('#submit-seach-btn')
          .click();
        cy.url()
          .should('be.equal', 'http://localhost:3000/courses-result');
    });

    it('Select the first course', () => {
        cy.get('.courses-result-tables')
          .first()
          .get('.dark-red-btn')
          .eq(0)
          .click();
        cy.url()
          .should('be.equal', 'http://localhost:3000/course-info');
    });

    it('Add the course to shopping cart', () => {
        cy.get('.add-btn')
          .click();
        cy.url()
          .should('be.equal', 'http://localhost:3000/shopping-cart');
    });

    it('Check the course added correctly', () => {
        cy.get('.course-table h4')
          .last()
          .contains("GEO1111");
    });

    it('Remove the new course', () => {
        cy.get('.course-table .delete-icon-btn')
          .last()
          .click();
    });
});
describe('My First Test', () => {
    it('Visits a page and checks title', () => {
      cy.visit('https://example.com');
      cy.title().should('include', 'Example');
    });
  });
  
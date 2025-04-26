describe('Login Form Validation', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080');
    });
  
    it('shows error if username is empty', () => {
      cy.get('#password').type('1234');
      cy.get('#loginBtn').click();
      cy.get('#error').should('have.text', 'Both fields are required!');
    });
  
    it('shows error if password is empty', () => {
      cy.get('#username').type('admin');
      cy.get('#loginBtn').click();
      cy.get('#error').should('have.text', 'Both fields are required!');
    });

    it('shows error when fields are empty', () => {
        cy.fixture('user').then((data) => {
          cy.get('#username').type(data.invalidUser.username);
          cy.get('#password').type(data.invalidUser.password);
          cy.get('#loginBtn').click();
          cy.get('#error').should('have.text', 'Both fields are required!');
        });
      });
    
      it('logs in successfully with valid user', () => {
        cy.fixture('user').then((data) => {
          cy.get('#username').type(data.validUser.username);
          cy.get('#password').type(data.validUser.password);
          cy.get('#loginBtn').click();
          cy.on('window:alert', (txt) => {
            expect(txt).to.contains('Login successful');
          });
        });
    });
  
    it('submits when both fields are filled', () => {
      cy.get('#username').type('admin');
      cy.get('#password').type('1234');
      cy.get('#loginBtn').click();
      // Optional: check if alert happens
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Login successful');
      });
    });
  });
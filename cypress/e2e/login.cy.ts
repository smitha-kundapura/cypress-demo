interface UserData {
  validUser: {
    username: string;
    password: string;
  };
  invalidUser: {
    username: string;
    password: string;
  };
}

describe('Login with TypeScript', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('validates empty form fields', () => {
    cy.fixture<UserData>('user').then((data) => {
      cy.get('#username').type(data.invalidUser.username);
      cy.get('#password').type(data.invalidUser.password);
      cy.get('#loginBtn').click();
      cy.get('#error').should('have.text', 'Both fields are required!');
    });
  });

  it('logs in with valid user', () => {
    cy.fixture<UserData>('user').then((data) => {
      cy.get('#username').type(data.validUser.username);
      cy.get('#password').type(data.validUser.password);
      cy.get('#loginBtn').click();
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Login successful');
      });
    });
  });
});

/// <reference types="cypress" />

describe('Login API Mocking', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');

    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: { token: 'abc123' }
    }).as('mockLogin');
  });

  it('logs in and shows success message', () => {
    cy.get('#username').type('admin');
    cy.get('#password').type('1234');
    cy.get('#loginBtn').click();

    cy.wait('@mockLogin');

    cy.get('#status').should('contain', 'Login success! Token: abc123');
  });
});


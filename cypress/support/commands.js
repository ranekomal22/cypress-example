import 'cypress-file-upload';
import 'cypress-xpath';

// Custom Cypress commands

Cypress.Commands.add('login', () => {
    // Open StoryMap page and sign in
    cy.visit('/')
    cy.get('.button').should('have.text', 'Sign in').click()

    // verify we are on sign in page
    cy.get('.page-title').contains('Sign in with').should('exist')

    const usernameKey = 'USER'
    const passwordKey = 'PWD'
    // Locate an email input field, type into it and verify that the value has been updated
    cy.get('#user_username').type(Cypress.env(usernameKey))

    // Locate password input field
    // Read password from environment variable and type it in password field
    cy.get('#user_password').type(Cypress.env(passwordKey))

    // Click on sign in button
    cy.get('#signIn').click()

    // verify new URL which includes '/stories'
    cy.url().should('include', '/stories')
})

// Wait For Spinner to finish loading
Cypress.Commands.add('waitForSpinner', (spinnerSelector) => {
    cy.get(spinnerSelector, {timeout: 10000}).should('have.length', 0)
})

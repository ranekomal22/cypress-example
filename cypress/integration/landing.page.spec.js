/// <reference types="cypress" />
const data = require('../fixtures/landing-page-data.json')

describe('Validate StoryMaps Landing Page', () => {

    beforeEach(() => {
        // Visit the page
        cy.visit('/')
    })

    it.only('should load static components', () => {
        // validate page title and logo
        cy.get('img.jsx-2772286003.logo').should('be.visible')

        // Verify Nav links
        cy.contains('Overview').should('be.visible').should('have.attr', 'href', data.overviewLink)
        cy.contains('Resources').should('be.visible').should('have.attr', 'href', data.resourcesLink)
        cy.get('.sign-in-link').should('have.text', data.signIn)

        // Verify Page content
        cy.get('h1.full-page-message-title').should('be.visible').should('have.text', data.header)
        cy.get('p.full-page-message-details').should('be.visible').should('have.text',  data.msgDetails)
        cy.get('a.button.default.primary').should('have.text', data.signIn)

        cy.contains('Terms of Use').should('be.visible')
        cy.contains('Contact').should('be.visible')
        cy.contains('Privacy').should('be.visible')
    })
})
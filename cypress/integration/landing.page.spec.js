/// <reference types="cypress" />

describe('Validate StoryMap Landing Page', () => {

    beforeEach(() => {
        // Visit the page
        cy.visit('https://storymaps.arcgis.com/')
    })

    it('should load static components', () => {
        // validate page title and logo
        cy.get('.full-page-message-title').should('have.text', 'ArcGIS StoryMaps')
        cy.get('img.jsx-2772286003.logo').should('be.visible')

        // Verify Nav links
        cy.contains('Overview').should('be.visible').should('have.attr', 'href', 'https://www.esri.com/en-us/arcgis/products/arcgis-storymaps/overview')
        cy.contains('Resources').should('be.visible').should('have.attr', 'href', 'https://www.esri.com/en-us/arcgis/products/arcgis-storymaps/resources')
        cy.get('.sign-in-link').should('have.text', 'Sign in')

        // Verify Page content
        cy.get('h1.full-page-message-title').should('be.visible').should('have.text', 'ArcGIS StoryMaps')
        cy.get('p.full-page-message-details').should('be.visible').should('have.text', 'Create inspiring, immersive stories by combining text, interactive maps, and other multimedia content. Publish and share your story with your organization or everyone around the world.')
        cy.get('a.button.default.primary').should('have.text', 'Sign in')

        cy.contains('Terms of Use').should('be.visible')
        cy.contains('Contact').should('be.visible')
        cy.contains('Privacy').should('be.visible')
    })
})
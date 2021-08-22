/// <reference types="cypress" />

describe('Validate Stories Page', () => {

    // Sign in Before all tests
    beforeEach(() => cy.login())

    it('should load components from stories page', () => {

        // Verify that loading spinner is done
        cy.waitForSpinner('.loading-spinner')

        // Verify logo
        cy.get('img.jsx-2772286003.logo').should('be.visible')
        // Verify Header 'Stories'
        cy.get('h2.jsx-3454713658').should('have.text', 'Stories')

        // Verify that New Story, My Stories/Favorites/Groups buttons exists
        cy.get('button.jsx-4157471165').contains('New story').should('be.visible')
        cy.get('#my-story-search').should('be.visible').should('have.attr', 'placeholder', 'Search')
        cy.get('button.tab-bar-tab').contains('My Stories').should('have.attr', 'aria-selected', 'true')
        cy.get('button.tab-bar-tab').contains('My Favorites').should('have.attr', 'aria-selected', 'false')
        cy.get('button.tab-bar-tab').contains('My Groups').should('have.attr', 'aria-selected', 'false')

        // Verify Nav bar is visible
        cy.get('nav').contains('Stories').should('have.attr', 'href', '/stories')
        cy.get('nav').contains('Collections').should('have.attr', 'href', '/collections')
        cy.get('nav').contains('Themes').should('have.class','jsx-2690234853').should('not.be.enabled')
        cy.contains('Explore stories').should('be.visible')
        cy.contains('Get started').should('be.visible')
        cy.contains('Latest news').should('be.visible')
        cy.contains('Story planning').should('be.visible')
        cy.contains('Tutorials').should('be.visible')
        cy.contains('Webinars').should('be.visible')
        cy.contains('FAQ').should('be.visible')

        // Verify that quick links button is visible and defaulted as expanded
        cy.get('button.jsx-2265165420').first()
            .should('be.visible')
            .should('have.attr', 'aria-expanded', 'true')
            .should('have.attr', 'aria-label', 'Collapse')

        // Verify that quick links button toggle options to be not visible
        cy.get('button.jsx-2265165420').first()
            .click()
            .should('have.attr', 'aria-expanded', 'false')
            .should('have.attr', 'aria-label', 'Expand')
            .then(() => {
                cy.contains('Explore stories').should('not.be.visible')
                cy.contains('Get started').should('not.be.visible')
                cy.contains('Latest news').should('not.be.visible')
                cy.contains('Story planning').should('not.be.visible')
                cy.contains('Tutorials').should('not.be.visible')
                cy.contains('Webinars').should('not.be.visible')
                cy.contains('FAQ').should('not.be.visible')
            })


        // Verify the Story Cards Container to either have stories or 'start a story' container
        cy.get('div.jsx-2059225257.grid-container.inner-grid-override')
            .children()
            .then($childElement => {
                if ($childElement.attr("class").includes('half-grid')) {
                    // If there are no story cards then Center positioned Start a Story button should be visible
                    cy.get('a.jsx-4157471165').should('have.text', 'Start a story')
                        .should('have.attr', 'href', '/stories/new')
                    cy.get('h2.msg-title').should('be.visible').should('have.text', 'Create your first story')
                    cy.get('p.msg-details').should('be.visible')
                        .should('have.text', 'Bring together maps, photos, videos, and text to craft a narrative that informs and inspires')
                } else {
                    // If there are story cards then button should not exist
                    cy.get('a.jsx-4157471165').should('not.exist')
                }
            })
    })

    it('create a new story', () => {

        //click on new story button
        // cy.get('button.jsx-4157471165').contains('New story').click()
        // cy.get('span.jsx-841270279').contains('Start from scratch').click()

    
    })
 })

  
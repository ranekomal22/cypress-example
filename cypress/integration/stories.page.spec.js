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

        // Verify that New Story, My Stories/Favorites/Groups buttons exist
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

        // Verify the Story Cards Container to either have stories or 'start a story' component
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

    it('should create a new story', () => {
        
        // Delete the first story (just for cleanup)
        // cy.get('[data-testid=context-menu-button]').first().should('be.visible').click()
        // cy.get('button.jsx-2684419046.dropdown-menu-item').should('be.visible').click()
        // cy.contains('Yes, delete').should('be.visible').click()
        
        // Wait until Story deleted message goes away
        // Until this element goes away we cannot interact with new stories button
        // cy.get('div.toast').should("not.be.visible")
        // cy.get('div.toast', {timeout: 10000}).should("not.exist")

        // click on new story button
        cy.get('button.jsx-4157471165').contains('New story').should('be.visible').click()
        cy.get('span.jsx-841270279.button-text').contains('Start from scratch').click()
        
        const storyTitle = `automation-${Date.now()}`;

        // Enter Story title with current epoch to make story name unique
        cy.get('textarea.sc-title', {timeout: 10000})
            .should('have.attr', 'placeholder', 'Title your story')
            .should('be.visible')
            .type(`${storyTitle}{enter}`)

        cy.get('textarea.sc-summary')
            .should('be.visible')
            .should('have.attr', 'placeholder', 'Start with a short introduction or subtitle (optional)')
            .type(`automation-story-summary{enter}`)
        
        // Click on + icon to add a field in story event
        cy.get('div.jsx-4218683185.is-awake')
            .first()
            .should('have.attr', 'title', 'Add content block')
            .should('be.visible')
            .click()
        
        // Select Text field
        // Using Xpath selector to grab a button for which one of it's children has Text
        cy.xpath('//button[contains(., "Text")]').scrollIntoView()
            .should('be.visible')
            .click()

        // Enter a sample text in Text field
        cy.get('div.ql-editor').should('have.attr', 'contenteditable', 'true')
            .first()
            .should('be.visible')
            .type(` California Trip{enter}`)

        // Click on + icon again to add another field 
        cy.get('div.jsx-4218683185.is-awake')
            .should('have.attr', 'title', 'Add content block')
            .eq(1)
            .should('be.visible')
            .click()
        
        // Using Xpath selector to grab a Span that has exact text Image 
        // and then return it's immediate parent which is of type button
        cy.xpath('//span[text()="Image"]//parent::button').scrollIntoView()
            .should('be.visible')
            .click()

        // Upload an Image using cypress upload file plugin
        const fileName = 'la-jolla-cove.png';
        cy.get('.upload-file-ui')
            .attachFile(fileName, { subjectType: 'drag-n-drop' });

        cy.get('button.default').should('have.text', 'Add').should('be.visible').click()   
    
        // Publish the story privately
        cy.contains('Publish').should('be.visible').click()
        cy.contains('Publish story').should('be.visible').click()

        // Varify that story was published
        cy.get('h1.sc-title', {timeout: 20000})
            .should('be.visible')
            .should('have.text', storyTitle)
    })
 })

  
# cypress-example            
Example to demonstrate Cypress Test Automation framework       

System Requirements
---------------
- node >= 10.15.x - [how to install Node](https://nodejs.org/en/download/)

Getting Started
---------------

Install the dependencies:

```bash
npm install
```
Run tests:

```bash
export CYPRESS_USER=<Esri_username>
export CYPRESS_PWD=<Esri_password>

npm run cypress:open
```
Test Scenario: Create a story in StoryMaps
---------------

Spec-1: Validate StoryMaps Landing Page
```
TC1: It should load static components
      - Visit the page
      - validate page title and logo
      - Verify Nav links
      - Verify Page content
```
          
Spec-2: Validate Stories Page
```
TC2: It should load components from stories page
      - Verify logo
      - Verify Header 'Stories'
      - Verify that New Story, My Stories/Favorites/Groups buttons exist
      - Verify Nav bar is visible
      - Verify that quick links button is visible and defaulted as expanded
      - Verify that quick links button toggle options to be not visible
      - Verify the Story Cards Container to either have stories or 'start a story' component
  

TC3: It should create a new story
      - Click on new story button
      - Enter Story title with current epoch to make story name unique
      - Click on + icon to add a field in story event
      - Enter a sample text in Text field
      - Click on + icon again to add another field 
      - Upload an Image 
      - Publish the story privately
      - Verify that story was published  
 ```



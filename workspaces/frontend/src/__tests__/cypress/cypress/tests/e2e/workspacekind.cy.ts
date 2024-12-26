import { mockWorkspacekindsValid, mockWorkspacekindsInValid } from '../mocked/workspacekinds.mock';

describe('Test KindLogo Functionality With Valid Data', () => {
  before(() => {
    
    // Mock the API response
    cy.intercept('GET', '/api/v1/workspacekinds', {
      statusCode: 200,
      body: mockWorkspacekindsValid,

    })

    // Visit the page
    cy.visit('/');
      
  });


  it('should fetch and populate kind logos', () => {
    
    // Check that the logos are rendered in the table
    cy.get('tbody tr').each(($row) => {
      cy.wrap($row).find('td[data-label="Kind"]').within(() => {
        cy.get('img')
            .should('exist')
      });
    });
  });

});

describe('Test KindLogo Functionality With InValid Data', () => {
  before(() => {

    // Mock the API response for workspace kinds
    cy.intercept('GET', '/api/vy1/workspacekinds', {
      statusCode: 200,
      body: mockWorkspacekindsInValid,
    });

    // Visit the page
    cy.visit('/');
  });
  
  it('should fallback to displayName when logo URL is invalid', () => {
    const workspaceKinds = mockWorkspacekindsInValid.data; // Access the data array
  
    // Check for fallback behavior in the table
    cy.get('tbody tr').each(($row, index) => {
      cy.wrap($row).find('td[data-label="Kind"]').within(() => {
        cy.get('img').then(($img) => {
          const src = $img.attr('src');
          cy.wrap($row).should('contain.text', workspaceKinds[index].displayName);
          if (src === 'https://invalid-url.example.com/invalid-logo.svg') {
            // If the URL is invalid, ensure displayName is visible as fallback
            cy.wrap($row).should('contain.text', workspaceKinds[index].displayName);
          } else {
            // If the logo URL is valid, ensure it is displayed
            cy.wrap($img).should('have.attr', 'src', src);
          }
        });
      });
    });
  });
  
});

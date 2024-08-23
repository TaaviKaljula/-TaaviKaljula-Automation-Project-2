describe('Issue Time Tracking', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click(); 
        });
    });

    it('Should handle time estimation correctly', () => {
        const initialEstimation = '5h';
        const updatedEstimation = '8h';

        // Add an estimation
        cy.get('[data-testid="add-estimation"]', { timeout: 10000 }) 
          .should('exist').and('be.visible')
          .click();
        cy.get('input[name="estimation"]').type(initialEstimation);
        cy.contains('button', 'Save').click();
        cy.contains('[data-testid="estimation-display"]', initialEstimation).should('be.visible');

        // Edit the estimation
        cy.get('[data-testid="edit-estimation"]', { timeout: 10000 }) 
          .should('exist').and('be.visible')
          .click();
        cy.get('input[name="estimation"]').clear().type(updatedEstimation);
        cy.contains('button', 'Save').click();
        cy.contains('[data-testid="estimation-display"]', updatedEstimation).should('be.visible');

        // Remove the estimation
        cy.get('[data-testid="remove-estimation"]', { timeout: 10000 }) 
          .should('exist').and('be.visible')
          .click();
        cy.contains('[data-testid="estimation-display"]').should('not.exist');
    });

    it('Should handle time logging correctly', () => {
        const initialTimeLog = '2h';
        const updatedTimeLog = '3h';
    
        cy.get('[data-testid="modal:issue-details"]', { timeout: 10000 }).should('be.visible');
    
        // Log time
        cy.get('[data-testid="log-time"]', { timeout: 10000 }) 
          .should('exist').and('be.visible')
          .click();
        
        cy.get('input[name="time"]').type(initialTimeLog);
        cy.contains('button', 'Save').click();
        cy.contains('[data-testid="time-log-display"]', initialTimeLog).should('be.visible');
    
        // Edit the logged time
        cy.get('[data-testid="edit-time-log"]', { timeout: 10000 }) 
          .should('exist').and('be.visible')
          .click();
        cy.get('input[name="time"]').clear().type(updatedTimeLog);
        cy.contains('button', 'Save').click();
        cy.contains('[data-testid="time-log-display"]', updatedTimeLog).should('be.visible');
    
        // Remove the logged time
        cy.get('[data-testid="remove-time-log"]', { timeout: 10000 }) 
          .should('exist').and('be.visible')
          .click();
        cy.contains('[data-testid="time-log-display"]').should('not.exist');
    });
});

import IssueModal from '../../pages/IssueModal';

describe('Issue delete', () => {
  const issueTitle = 'This is an issue of type: Task.';

  beforeEach(() => {
    cy.visit('/').wait(25000);
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then(() => {
        cy.contains(issueTitle).click();
      });
  });

  it('Should delete issue successfully', () => {
    const expectedNumberOfIssuesAfterDeletion = 3;
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle);
    IssueModal.confirmNumberOfIssuesInBacklog(expectedNumberOfIssuesAfterDeletion);
  });

  it('Should cancel deletion process successfully', () => {
    const expectedNumberOfIssuesAfterCancel = 4;
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle);
    IssueModal.confirmNumberOfIssuesInBacklog(expectedNumberOfIssuesAfterCancel);
  });
});

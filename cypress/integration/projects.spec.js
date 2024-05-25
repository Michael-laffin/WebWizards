describe('Project Posting and Viewing', () => {
    beforeEach(() => {
      cy.login(); // Custom command to log in before each test
    });
  
    it('should post a new project', () => {
      cy.visit('/projects/new');
      cy.get('input[name="title"]').type('Test Project');
      cy.get('textarea[name="description"]').type('This is a test project');
      cy.get('input[name="skillsRequired"]').type('JavaScript, React');
      cy.get('input[name="budget"]').type('1000');
      cy.get('input[name="deadline"]').type('2024-12-31');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/projects');
    });
  
    it('should view the list of projects', () => {
      cy.visit('/projects');
      cy.contains('Test Project').click();
  
      cy.url().should('include', '/projects/');
      cy.contains('This is a test project');
    });
  });
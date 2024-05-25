describe('User Registration and Login', () => {
    it('should register a new user', () => {
      cy.visit('/register');
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('select[name="role"]').select('freelancer');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/projects');
    });
  
    it('should login an existing user', () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/projects');
    });
  });
  
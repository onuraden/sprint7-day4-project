import { errorMessages } from "../../src/components/Login";

describe('login page', () => {
  describe("successful", () => {
    it('logins', () => {
      cy.visit('http://localhost:5173/');
      cy.get("[data-cy='email-input']").type("erdem.guntay@wit.com.tr");
      cy.get("[data-cy='pass-input']").type("9fxIH0GXesEwH_I");
      cy.get("[data-cy='terms-input']").check();
      cy.get("[data-cy='button-input']").click();
  
      cy.location().should((loc) => {
        expect(loc.pathname.toString()).to.contain('/success');
      });
    })
  })
  describe("error messages", () => {
    it('email error', () => {
      cy.visit('http://localhost:5173/');
      cy.get("[data-cy='email-input']").type("erdem.guntay@wi");
      cy.contains(errorMessages.email);
      });
    })
  })
  
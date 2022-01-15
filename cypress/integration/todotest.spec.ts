describe("todo list test", () => {
  it("Adding a todo", () => {
    // 1 Arrange
    cy.visit("http://localhost:1234");
    cy.get("#todo-text").type("Handla");
    // 2 Act
    cy.get("button[type=button]").click();
    // 3 Assert
    cy.get(".task").should("have.length", 1);
  });
  it("Deleting a todo", () => {
    cy.visit("http://localhost:1234");
    cy.get("#todo-text").type("Handla");
    cy.get("button[type=button]").click();
    cy.visit("http://localhost:1234");
    cy.get("input[type=checkbox]").click();
    cy.get(".task").should("have.length", 0);
  });
});

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "benimanjaro",
      username: "benogre8",
      password: "borismasuge",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login").click();
    cy.contains("username");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("benogre8");
      cy.get("#password").type("borismasuge");
      cy.get("#login-button").click();

      cy.contains("benimanjaro logged-in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("benogre8");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.contains("Wrong Credentials");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("benogre8");
      cy.get("#password").type("borismasuge");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.createBlog({ title: "testcy", author: "testcy", url: "testcy" });
    });
    describe("And several blogs are created", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "testcy1",
          author: "testcy",
          url: "testcy",
          likes: "0",
        });
        cy.createBlog({
          title: "testcy2",
          author: "testcy",
          url: "testcy",
          likes: "2",
        });
        cy.createBlog({
          title: "testcy3",
          author: "testcy",
          url: "testcy",
          likes: "1",
        });
      });
      it("A blog can be deleted", function () {
        cy.contains("view").click();
        cy.on("window:confirm", (str) => {
          expect(str).to.eq("Delete blog testcy2 by testcy?");
        });
        cy.contains("delete").click();
      });
      it("One of them can be liked", function () {
        cy.contains("view").click();
        cy.contains("like").click();
        cy.contains("testcy1").contains("1");
      });
      it("Blogs are ordered by the number of likes", function () {
        cy.get("view").then((buttons) => {
          expect(buttons[0].likes).to.eq(2);
          expect(buttons[1].likes).to.eq(1);
          expect(buttons[2].likes).to.eq(0);
        });
      });
    });
  });
});

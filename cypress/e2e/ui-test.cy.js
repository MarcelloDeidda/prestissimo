describe("Testing Main Menu", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8080")

        cy.getCyData("pitch").as("pitch");
        cy.getCyData("intervals").as("intervals");
    });

    it("Check page elements", () => {
        cy.getCyData("title").should("exist");
        cy.getCyData("logo").should("exist");
        cy.get("@pitch").should("exist");
        cy.get("@intervals").should("exist");
    });

    it("Check modal functionality", () => {
        cy.get("@pitch").click();

        cy.getCyData("modal").should("exist");
        cy.getCyData("modal-background").should("exist").click({ force: true });

        cy.getCyData("modal").should("not.exist");
        cy.getCyData("modal-background").should("not.exist");
    });

    it("Test grade buttons", () => {
        cy.get("@pitch").click();

        cy.getCyData("1").click();

        cy.contains("Pitch").should("exist");
        cy.contains("Grade One").should("exist");

        cy.getCyData("back-to-main-menu").click();
        cy.contains("Prestissimo").should("exist");

        cy.get("@intervals").click();

        cy.getCyData("5").click();

        cy.contains("Intervals").should("exist");
        cy.contains("Grade Five").should("exist");

        cy.getCyData("back-to-main-menu").click();
        cy.contains("Prestissimo").should("exist");
    });
});

describe("Testing Exercise page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8080")

        cy.getCyData("pitch").as("pitch");
    });

    it("Check page elements", () => {
        cy.get("@pitch").click();
        cy.getCyData("1").click();

        cy.getCyData("section-title").should("exist");
        cy.getCyData("back-to-main-menu").should("exist");
        cy.getCyData("grade-title").should("exist");
        cy.getCyData("question").should("exist");
        cy.getCyData("score").should("exist");
        cy.getCyData("options").should("exist");
        cy.getCyData("question").should("exist");
        cy.getCyData("length").should("exist");
        cy.getCyData("next-button").should("exist");
    });

    it("Check exercise functionality", () => {
        cy.wrap(0).as("rightAnswers");
        cy.wrap(0).as("wrongAnswers");

        cy.get("@pitch").click();
        cy.getCyData("1").click();

        for (let i = 0; i < 15; i++) {
            cy.getCyData("next-button").should("be.disabled");

            cy.getCyData("options").find("button").first().click();

            cy.getCyData("options")
                .then(($options) => {
                    if ($options.find('[data-cy=wrong]').length) {
                        cy.get("@wrongAnswers").then(value => {
                            cy.wrap(value + 1).as("wrongAnswers");
                        })
                        return;
                    }
                    cy.get("@rightAnswers").then(value => {
                        cy.wrap(value + 1).as("rightAnswers");
                    })
                    return;
                })

            cy.getCyData("next-button").should("not.be.disabled").click();
        }

        cy.get("@rightAnswers").then(rightValue => {
            cy.get("@wrongAnswers").then(wrongValue => {
                cy.contains(`${rightValue}/${rightValue + wrongValue}`).should("exist");
            })
        });

        cy.getCyData("result-modal-button").click();
        cy.contains("Prestissimo").should("exist");
    })
});
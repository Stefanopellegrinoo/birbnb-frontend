describe("template spec", () => {
    it("Login de usuario correctamente de un huesped", () => {
        cy.visit("http://localhost:3001");
        cy.location("pathname", { timeout: 10000 }).should("eq", "/");

        const buttonLogin = cy.get('a[href="/auth/login"] button');
        buttonLogin.click();
        const inputEmail = cy.get('input[placeholder="tu@email.com"]');
        inputEmail.type("huesped12@gmail.com");
        const inputPassword = cy.get('input[placeholder="Tu contraseña"]');
        inputPassword.type("huesped1234");
        const buttonSubmit = cy.get('button[type="submit"]');
        buttonSubmit.click();
        cy.location("pathname", { timeout: 10000 }).should("eq", "/");

        const alojamientosButton = cy
            .get(':nth-child(2) > [href="/alojamientos"]', { timeout: 10000 })
            .should("be.visible")
            .click();
        alojamientosButton.click();

        cy.get(".alojamientos-grid .alojamiento-card", {
            timeout: 10000,
        }).should("have.length.greaterThan", 0);

        const card1 = cy
            .get(
                "body > div.layout-root > main > div > div > div.alojamientos-grid > a:nth-child(1)"
            )
            .invoke("removeAttr", "target")
            .should("be.visible");
        card1.click();
        cy.location("pathname", { timeout: 10000 }).should(
            "match",
            /^\/alojamientos\/[\w\d]+$/
        );
        cy.get("form.reserva-form").scrollIntoView().should("be.visible");
        cy.get("#date-range").should("be.visible").click();

        const fechaInicio = 21;
        const fechaFinal = 23;

        cy.get('[id^="mantine-"][id$="-dropdown"]')
            .should("be.visible")
            .within(() => {
                cy.contains("button", fechaInicio.toString()).click();
                cy.contains("button", fechaFinal.toString()).click();
            });
        cy.get("form.reserva-form select").select("5");
        cy.get('form.reserva-form button[type="submit"]').click();

        cy.location("pathname", { timeout: 10000 }).should("eq", "/reservas");
        const mes = "julio";
        const año = "2025";
        const rangoFechas = `${fechaInicio} de ${mes} de ${año} - ${fechaFinal} de ${mes} de ${año}`;
        const cantidadHuespedes = "5 personas";

        cy.location("pathname", { timeout: 10000 }).should("eq", "/reservas");

        // Validar que al menos una tarjeta contenga ambas cosas
        cy.contains(".reserva-card", rangoFechas).should("exist");
        cy.contains(".reserva-card", cantidadHuespedes).should("exist");
    });
});

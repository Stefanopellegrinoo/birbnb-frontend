describe("Flujo de reserva de alojamiento", () => {
    it("Un huésped puede iniciar sesión, seleccionar y reservar un alojamiento exitosamente", () => {
        const gmail = "huesped12@gmail.com";
        const pass = "huesped12";
        const nombreAlojamiento = "aloha23";
        const paginaPrincipal = "http://localhost:3000";
        const fechaInicioReserva = 23;
        const fechaFinalReserva = 24;
        const cantHuespedes = 3;

        cy.visit(paginaPrincipal);
        cy.location("pathname", { timeout: 10000 }).should("eq", "/");

        cy.get('a[href="/auth/login"] button').click();
        cy.get('input[placeholder="tu@email.com"]').type(gmail);
        cy.get('input[placeholder="Tu contraseña"]').type(pass);
        cy.get('button[type="submit"]').click();
        cy.location("pathname", { timeout: 10000 }).should("eq", "/");

        cy.get(':nth-child(2) > [href="/alojamientos"]', { timeout: 10000 })
            .should("be.visible")
            .click();

        cy.location("pathname").should("eq", "/alojamientos");

        cy.get(".alojamientos-grid a.alojamiento-card", {
            timeout: 10000,
        }).should("be.visible");

        // 1. Encuentra el elemento 'a.alojamiento-card' que contiene el texto 'aloha23'.
        //    El sujeto devuelto es el propio <a>, no el texto interno.
        cy.contains("a.alojamiento-card", nombreAlojamiento)
            .should("be.visible") // Buena práctica: asegurar que es visible
            .invoke("removeAttr", "target") // Ahora sí se aplica al <a>
            .click(); // Y el clic también se aplica al <a>

        cy.location("pathname", { timeout: 10000 }).should(
            "match",
            /^\/alojamientos\/[\w\d]+$/
        );

        cy.get("main .alojamiento-detalle .detalle-main form.reserva-form")
            .scrollIntoView()
            .should("be.visible");
        cy.get("#date-range").should("be.visible").click();

        cy.get(
            '[id^="mantine-"][id$="-dropdown"] .mantine-DatePickerInput-monthTbody'
        )
            .should("be.visible")
            .within(() => {
                cy.contains("button", fechaInicioReserva.toString()).click();
                cy.contains("button", fechaFinalReserva.toString()).click();
            });
        cy.get("form.reserva-form select").select([cantHuespedes.toString()]);
        cy.get('form.reserva-form button[type="submit"]').click();

        cy.url({ timeout: 10000 }).should("include", "/reservas/confirmacion");

        cy.get("main h2").contains("¡Reserva confirmada!").should("be.visible");

        // c. Verificar que el ícono de check verde está presente
        cy.get("svg.tabler-icon-check")
            .should("be.visible")
            .and("have.attr", "stroke", "green");

        cy.contains("p", "Has reservado en")
            .should("be.visible")
            .and("contain.text", nombreAlojamiento) // Valida el nombre del lugar
            .and("contain.text", "2025-07-" + fechaInicioReserva) // Valida la fecha de inicio
            .and("contain.text", "2025-07-" + fechaFinalReserva) // Valida la fecha de fin
            .and("contain.text", cantHuespedes + " huéspedes"); // Valida el número de huéspedes

        cy.contains("p", "Precio por noche:")
            .should("be.visible")
            .find("strong")
            .should("contain.text", "100");

        cy.get('a[href="/alojamientos"] button')
            .contains("Ver más alojamientos")
            .should("be.visible");

        cy.get('a[href="/"] button')
            .contains("Volver al inicio")
            .should("be.visible");
        cy.get("header button span").contains("Perfil").click();
        cy.get('body div a[href="/reservas"]').click();
        const mes = "julio";
        const año = "2025";
        const rangoFechas = `${fechaInicioReserva} de ${mes} de ${año} - ${fechaFinalReserva} de ${mes} de ${año}`;
        const cantidadHuespedes = cantHuespedes + " personas";

        cy.get("main .mis-reservas .reservas-list", {
            timeout: 10000,
        }).should("be.visible");

        cy.location("pathname", { timeout: 10000 }).should("eq", "/reservas");
        // Validar que al menos una tarjeta contenga ambas cosas
        cy.contains(".reserva-card", rangoFechas).scrollIntoView().should("exist");
        cy.contains(".reserva-card", cantidadHuespedes).scrollIntoView().should("exist");
    });
});

$(document).ready(function () {
    const resultadoContenedor = $("#resultado");
    const empezarBtn = $("#empezarBtn");
    const iniciarRondasBtn = $("#iniciarRondasBtn");
    const resetBtn = $("#resetBtn");
  
    let jugadas = [];
    let rondasConfirmadas = 0;
  
    empezarBtn.on("click", function () {
        const jugador1 = $("#jugador1").val().trim();
        const jugador2 = $("#jugador2").val().trim();
  
        if (jugador1 === "" || jugador2 === "") {
            resultadoContenedor.html("Por favor ingrese el nombre de ambos jugadores.");
            return;
        }
  
        $("#jugadores").hide();
        $("#rondas").show();
    });
  
    iniciarRondasBtn.on("click", function () {
        const numeroRondas = parseInt($("#numeroRondas").val());
        if (isNaN(numeroRondas) || numeroRondas < 1 || numeroRondas > 10) {
            resultadoContenedor.html("Por favor ingrese un número válido de rondas (1-10).");
            return;
        }
  
        reset();
  
        mostrarOpciones(numeroRondas);
    });
  
    resetBtn.on("click", reset);
  
    function mostrarOpciones(numeroRondas) {
        const opcionesContainer = $("#opcionesContainer");
        opcionesContainer.empty();
        rondasConfirmadas = 0;
  
        for (let i = 1; i <= numeroRondas; i++) {
            const rondaContainer = $("<div>").addClass("ronda-container");
            const rondaLabel = $("<p>").text(`Ronda ${i}:`);
            const jugador1Input = $("<input>").attr({ type: "number", min: 1, max: 2, placeholder: "Jugador 1" }).addClass("opcion-input");
            const jugador2Input = $("<input>").attr({ type: "number", min: 1, max: 2, placeholder: "Jugador 2" }).addClass("opcion-input");
            const confirmarBtn = $("<button>").text("Confirmar");
  
            if (i === 1) {
                confirmarBtn.prop("disabled", false);
            } else {
                confirmarBtn.prop("disabled", true);
            }
  
            confirmarBtn.on("click", function () {
                const seleccionJugador1 = parseInt(jugador1Input.val());
                const seleccionJugador2 = parseInt(jugador2Input.val());
                const seleccionPC = Math.floor(Math.random() * 2) + 1;
  
                jugadas.push({ jugador1: seleccionJugador1, jugador2: seleccionJugador2, pc: seleccionPC });
                rondasConfirmadas++;
  
                const ganadorRonda = obtenerGanador(seleccionJugador1, seleccionJugador2, seleccionPC);
                mostrarResultado(`Ronda ${i}: Jugador 1 (${seleccionJugador1}), Jugador 2 (${seleccionJugador2}), PC (${seleccionPC}). ${ganadorRonda}`);
  
                $(this).prop("disabled", true); // Deshabilitar el botón de confirmar de esta ronda
  
                if (rondasConfirmadas < numeroRondas) {
                    $(this).closest(".ronda-container").next().find("button").prop("disabled", false); // Habilitar el botón de confirmar de la siguiente ronda
                } else {
                    mostrarResultadosFinales();
                    resetBtn.show();
                }
            });
  
            rondaContainer.append(rondaLabel, jugador1Input, jugador2Input, confirmarBtn);
            opcionesContainer.append(rondaContainer);
        }
    }
  
    function mostrarResultado(resultado) {
        resultadoContenedor.append(`<p>${resultado}</p>`);
    }
  
    function obtenerGanador(seleccionJugador1, seleccionJugador2, seleccionPC) {
        if (seleccionJugador1 === seleccionJugador2 && seleccionJugador2 !== seleccionPC) {
            return "PC gana";
        } else if (seleccionJugador1 === seleccionPC && seleccionJugador2 !== seleccionPC) {
            return "Jugador 2 gana";
        } else if (seleccionJugador2 === seleccionPC && seleccionJugador1 !== seleccionPC) {
            return "Jugador 1 gana";
        } else {
            return "Empate";
        }
    }
  
    function mostrarResultadosFinales() {
        let jugador1Wins = 0;
        let jugador2Wins = 0;
        let pcWins = 0;
        let empates = 0;
    
        for (let i = 0; i < jugadas.length; i++) {
            const ganador = obtenerGanador(jugadas[i].jugador1, jugadas[i].jugador2, jugadas[i].pc);
            if (ganador === "Jugador 1 gana") {
                jugador1Wins++;
            } else if (ganador === "Jugador 2 gana") {
                jugador2Wins++;
            } else if (ganador === "PC gana") {
                pcWins++;
            } else {
                empates++;
            }
        }
    
        resultadoContenedor.append(`<p>--- Resultados Finales ---</p>`);
        resultadoContenedor.append(`<p>Jugador 1 (${ $("#jugador1").val()}): ${jugador1Wins} victorias</p>`);
        resultadoContenedor.append(`<p>Jugador 2 (${ $("#jugador2").val()}): ${jugador2Wins} victorias</p>`);
        resultadoContenedor.append(`<p>Goku (PC): ${pcWins} victorias</p>`);
        resultadoContenedor.append(`<p>Empates: ${empates}</p>`);
    
        // Determinar el premio para cada jugador
        const maxWins = Math.max(jugador1Wins, jugador2Wins, pcWins);
        const minWins = Math.min(jugador1Wins, jugador2Wins, pcWins);
        
        const premioJugador1 = jugador1Wins === maxWins ? "Trofeo de Oro" : (jugador1Wins === minWins ? "Certificado de Participación" : "Trofeo de Plata");
        const premioJugador2 = jugador2Wins === maxWins ? "Trofeo de Oro" : (jugador2Wins === minWins ? "Certificado de Participación" : "Trofeo de Plata");
        const premioPC = pcWins === maxWins ? "Trofeo de Oro" : (pcWins === minWins ? "Certificado de Participación" : "Trofeo de Plata");
    
        const mensajes = {
            "primer_lugar": "¡Felicidades! Eres el ganador del Trofeo de Oro.",
            "segundo_lugar": "¡Excelente! Obtuviste el Trofeo de Plata.",
            "tercer_lugar": "Gracias por participar. Te otorgamos un Certificado de Participación."
        };
    
        const jugador1Mensaje = mensajes[obtenerPremioMensaje(premioJugador1)];
        const jugador2Mensaje = mensajes[obtenerPremioMensaje(premioJugador2)];
        const pcMensaje = mensajes[obtenerPremioMensaje(premioPC)];
    
        resultadoContenedor.append(`<p>${$("#jugador1").val()}: ${jugador1Mensaje}</p>`);
        resultadoContenedor.append(`<p>${$("#jugador2").val()}: ${jugador2Mensaje}</p>`);
        resultadoContenedor.append(`<p>Goku (PC): ${pcMensaje}</p>`);
    }
    
    function obtenerPremioMensaje(premio) {
        switch (premio) {
            case "Trofeo de Oro":
                return "primer_lugar";
            case "Trofeo de Plata":
                return "segundo_lugar";
            case "Certificado de Participación":
            default:
                return "tercer_lugar";
        }
    }
    
    function obtenerPremio(jugadasGanadas) {
        if (jugadasGanadas === 0) {
            return "Certificado de Participación";
        } else if (jugadasGanadas === 1) {
            return "Trofeo de Plata";
        } else {
            return "Trofeo de Oro";
        }
    }
  
    function reset() {
        resultadoContenedor.empty();
        $("#jugadores").show();
        $("#rondas").hide();
        $("#opcionesContainer").empty();
        jugadas = [];
        resetBtn.hide();
    }
});

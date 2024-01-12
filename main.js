document.addEventListener('DOMContentLoaded', function () {
    const opcionesSelect = document.getElementById('opciones');
    const rondasInput = document.getElementById('rondas');
    const jugarButton = document.getElementById('jugar');
    const resetButton = document.getElementById('reset');
    const resultadosContainer = document.getElementById('resultados');

    let rondasJugadas = 0;
    let totalRondas = 0;
    let victoriasJugadores = [0, 0, 0]; // Índices: 0 - Jugador 1, 1 - Jugador 2, 2 - Jugador 3
    let empates = 0;

    function obtenerEleccionAleatoria() {
        return Math.floor(Math.random() * 2) + 1;
    }

    function determinarGanador(jugador1, jugador2, jugador3) {
        if (jugador1 === jugador2 && jugador2 === jugador3) {
            return null;
        } else {
            if (jugador1 !== jugador2 && jugador1 !== jugador3) {
                return 0;
            } else if (jugador2 !== jugador1 && jugador2 !== jugador3) {
                return 1;
            } else {
                return 2;
            }
        }
    }

    function jugarRonda(eleccionUsuario) {
        const eleccionJugador1 = eleccionUsuario;
        const eleccionJugador2 = obtenerEleccionAleatoria();
        const eleccionJugador3 = obtenerEleccionAleatoria();

        const ganador = determinarGanador(eleccionJugador1, eleccionJugador2, eleccionJugador3);

        const resultadoHTML = document.createElement('p');
        resultadoHTML.textContent = `Ronda ${rondasJugadas + 1}: `;
        resultadoHTML.textContent += `Jugador 1 eligió: ${eleccionJugador1}, `;
        resultadoHTML.textContent += `Jugador 2 eligió: ${eleccionJugador2}, `;
        resultadoHTML.textContent += `Jugador 3 eligió: ${eleccionJugador3}. `;

        if (ganador === null) {
            resultadoHTML.textContent += '¡Empate en esta ronda!';
            empates++;
        } else {
            resultadoHTML.textContent += `¡El jugador ${ganador + 1} ganó en esta ronda!`;

            victoriasJugadores[ganador]++;
        }

        resultadosContainer.appendChild(resultadoHTML);
    }

    function determinarGanadorJuego() {
        const maxVictorias = Math.max(...victoriasJugadores);
        const ganadores = [];

        for (let i = 0; i < victoriasJugadores.length; i++) {
            if (victoriasJugadores[i] === maxVictorias) {
                ganadores.push(`Jugador ${i + 1}`);
            }
        }

        if (ganadores.length === 1) {
            return `El ganador del juego es: ${ganadores[0]}`;
        } else {
            return 'Empate en el juego';
        }
    }

    function reiniciarJuego() {
        rondasJugadas = 0;
        totalRondas = 0;
        victoriasJugadores = [0, 0, 0];
        empates = 0;
        resultadosContainer.innerHTML = '';
    }

    jugarButton.addEventListener('click', function () {
        const eleccionUsuario = parseInt(opcionesSelect.value);
        const rondasUsuario = parseInt(rondasInput.value);

        if (!isNaN(eleccionUsuario) && (eleccionUsuario === 1 || eleccionUsuario === 2) && !isNaN(rondasUsuario) && rondasUsuario >= 1) {
            totalRondas = rondasUsuario;

            if (rondasJugadas < totalRondas) {
                jugarRonda(eleccionUsuario);
                rondasJugadas++;

                if (rondasJugadas === totalRondas) {
                    const ganadorJuego = determinarGanadorJuego();
                    const resultadoFinalHTML = document.createElement('p');
                    resultadoFinalHTML.textContent = ganadorJuego;
                    resultadosContainer.appendChild(resultadoFinalHTML);
                }
            }
        } else {
            alert('Por favor, elige 1 o 2 y especifica un número válido de rondas.');
        }
    });

    resetButton.addEventListener('click', function () {
        reiniciarJuego();
    });
});

async function cargarDatosDesdeJSON() {
    try {
        const response = await fetch('datos.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar datos desde el archivo JSON:', error);
        return null;
    }
}

function obtenerNombreJugador(numeroJugador) {
    const nombre = prompt(`Ingrese el nombre del Jugador ${numeroJugador}:`) || `Jugador ${numeroJugador}`;
    localStorage.setItem(`nombreJugador${numeroJugador}`, nombre);
    return nombre;
}

function obtenerEleccionAleatoria() {
    return Math.floor(Math.random() * 2) + 1;
}

function obtenerEleccionPorConsola(nombreJugador) {
    let eleccion = parseInt(prompt(`${nombreJugador}, elige 1 o 2:`));

    while (isNaN(eleccion) || (eleccion !== 1 && eleccion !== 2)) {
        alert('Por favor, elige solo 1 o 2.');
        eleccion = parseInt(prompt(`${nombreJugador}, elige 1 o 2:`));
    }

    return eleccion;
}

function determinarGanador(jugador1, jugador2, jugador3) {
    if (jugador1 === jugador2 && jugador2 === jugador3) {
        return null; // Empate
    } else if (jugador1 === jugador2) {
        return 3; // Jugador 3 (Goku) gana
    } else if (jugador1 === jugador3) {
        return 2; // Jugador 2 gana
    } else {
        return 1; // Jugador 1 gana
    }
}

function cargarDatosAlmacenados() {
    const storedData = localStorage.getItem('resultados');
    return storedData ? JSON.parse(storedData) : [];
}

function guardarDatosAlmacenados(resultados) {
    localStorage.setItem('resultados', JSON.stringify(resultados));
}

function resetearJuego() {
    localStorage.clear(); 
    document.getElementById('resultados-container').innerHTML = '';
    habilitarBotonIniciar();
}

function nombreJugador3(numeroJugador) {
    if (numeroJugador === 1 || numeroJugador === 2) {
        return localStorage.getItem(`nombreJugador${numeroJugador}`) || `Jugador ${numeroJugador}`;
    } else if (numeroJugador === 3) {
        return "Goku";
    } else {
        return "Desconocido";
    }
}

let juegoEnProgreso = false;

function habilitarBotonIniciar() {
    juegoEnProgreso = false;
    document.getElementById('iniciar-juego').disabled = false;
}

function deshabilitarBotonIniciar() {
    juegoEnProgreso = true;
    document.getElementById('iniciar-juego').disabled = true;
}


async function iniciarJuego() {
    const inputRondas = document.getElementById('input-rondas');
    const rondas = parseInt(inputRondas.value);
    if (juegoEnProgreso) {
        alert('El juego ya está en progreso. Reinicia el juego para jugar de nuevo.');
        return;
    }

    if (isNaN(rondas) || rondas < 1) {
        alert('Por favor, ingrese un número válido de rondas.');
        return;
    }

    const premios = await cargarDatosDesdeJSON();

    if (!premios || !premios.jugadores || !premios.premios) {
        console.error('Error al cargar los datos de premios desde el archivo JSON.');
        return;
    }

    const nombreJugador1 = obtenerNombreJugador(1);
    const nombreJugador2 = obtenerNombreJugador(2);

    // Contadores
    let empates = 0;
    let victoriasJugador1 = 0;
    let victoriasJugador2 = 0;
    let victoriasGoku = 0;

    for (let i = 0; i < rondas; i++) {
        const eleccionJugador1 = obtenerEleccionPorConsola(nombreJugador1);
        const eleccionJugador2 = obtenerEleccionPorConsola(nombreJugador2);
        const eleccionJugador3 = obtenerEleccionAleatoria();

        const ganador = determinarGanador(eleccionJugador1, eleccionJugador2, eleccionJugador3);

        const resultadoMensaje = ganador === null
            ? `Empate en la ronda ${i + 1}!`
            : `${nombreJugador3(ganador)} ganó en la ronda ${i + 1}!`;

        const resultadosContainer = document.getElementById('resultados-container');
        resultadosContainer.innerHTML += `<p>Ronda ${i + 1}: ${nombreJugador1} eligió ${eleccionJugador1}, ${nombreJugador2} eligió ${eleccionJugador2}, Goku eligió ${eleccionJugador3}. ${resultadoMensaje}</p>`;

        if (ganador === null) {
            empates++;
        } else {
            // Actualizar contadores de victorias
            if (ganador === 1) {
                victoriasJugador1++;
            } else if (ganador === 2) {
                victoriasJugador2++;
            } else {
                victoriasGoku++;
            }
        }
    }

    // Mostrar resultados finales después de todas las rondas
    const resultadosContainer = document.getElementById('resultados-container');
    resultadosContainer.innerHTML += '<h2>Resultados finales:</h2>';

    const resultados = [
        { jugador: nombreJugador1, victorias: victoriasJugador1 },
        { jugador: nombreJugador2, victorias: victoriasJugador2 },
        { jugador: 'Goku', victorias: victoriasGoku },
        { jugador: 'Empates', victorias: empates }
    ];

    resultados.sort((a, b) => b.victorias - a.victorias);

    resultados.forEach((resultado, indice) => {
        if (resultado.jugador === 'Empates') {
            resultadosContainer.innerHTML += `<p>${resultado.jugador}: ${resultado.victorias} empates</p>`;
        } else {
            const premio = indice === 0
                ? premios.premios.primerLugar
                : (indice === 1 ? premios.premios.segundoLugar : premios.premios.tercerLugar);
            resultadosContainer.innerHTML += `<p>Posición ${indice + 1}: ${resultado.jugador} - ${resultado.victorias} victorias - ${premio}</p>`;
        }
    });
    deshabilitarBotonIniciar();
}


function nombreJugador3(numeroJugador) {
    if (numeroJugador === 1 || numeroJugador === 2) {
        return localStorage.getItem(`nombreJugador${numeroJugador}`) || `Jugador ${numeroJugador}`;
    } else if (numeroJugador === 3) {
        return "Goku";
    } else {
        return "Desconocido";
    }
}

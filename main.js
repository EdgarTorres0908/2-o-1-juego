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
        return null; 
    } else if (jugador1 !== jugador2 && jugador2 !== jugador3 && jugador1 !== jugador3) {
        return null; 
    } else {
        if (jugador1 !== jugador2 && jugador1 !== jugador3) {
            return 1; 
        } else if (jugador2 !== jugador1 && jugador2 !== jugador3) {
            return 2; 
        } else {
            return 3; 
        }
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

async function iniciarJuego() {
    const inputRondas = document.getElementById('input-rondas');
    const rondas = parseInt(inputRondas.value);

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

    for (let i = 0; i < rondas; i++) {
        const eleccionJugador1 = obtenerEleccionPorConsola(nombreJugador1);
        const eleccionJugador2 = obtenerEleccionPorConsola(nombreJugador2);
        const eleccionJugador3 = obtenerEleccionAleatoria();

        const ganador = determinarGanador(eleccionJugador1, eleccionJugador2, eleccionJugador3);

        const resultadoMensaje = ganador === null
            ? `Empate en la ronda ${i + 1}!`
            : `${nombreJugador3(ganador)} ganó en la ronda ${i + 1}!`;

        const resultadosContainer = document.getElementById('resultados-container');
        resultadosContainer.innerHTML += `<p>Ronda ${i + 1}: ${nombreJugador3(1)} eligió ${eleccionJugador1}, ${nombreJugador3(2)} eligió ${eleccionJugador2}, ${nombreJugador3(3)} eligió ${eleccionJugador3}. ${resultadoMensaje}`;

        if (ganador !== null) {
            const victoriasJugador1 = localStorage.getItem('victoriasJugador1') || "0";
            const victoriasJugador2 = localStorage.getItem('victoriasJugador2') || "0";
            const victoriasGoku = localStorage.getItem('victoriasGoku') || "0";

            if (ganador === 1) {
                localStorage.setItem('victoriasJugador1', (parseInt(victoriasJugador1) || 0) + 1);
            } else if (ganador === 2) {
                localStorage.setItem('victoriasJugador2', (parseInt(victoriasJugador2) || 0) + 1);
            } else {
                localStorage.setItem('victoriasGoku', (parseInt(victoriasGoku) || 0) + 1);
            }

            const resultados = [
                { jugador: nombreJugador3(1), victorias: parseInt(victoriasJugador1) },
                { jugador: nombreJugador3(2), victorias: parseInt(victoriasJugador2) },
                { jugador: nombreJugador3(3), victorias: parseInt(victoriasGoku) }
            ];

            guardarDatosAlmacenados(resultados);
        }
    }

    const resultadosContainer = document.getElementById('resultados-container');
    resultadosContainer.innerHTML += '<h2>Resultados finales:</h2>';
    const resultados = cargarDatosAlmacenados();

    resultados.sort((a, b) => b.victorias - a.victorias);

    resultados.forEach((resultado, indice) => {
        const premio = indice === 0
            ? premios.premios.primerLugar
            : (indice === 1 ? premios.premios.segundoLugar : premios.premios.tercerLugar);
        resultadosContainer.innerHTML += `<p>Posición ${indice + 1}: ${indice === 2 ? "Goku" : resultado.jugador} - ${resultado.victorias} victorias - ${premio}</p>`;
        });
}

function nombreJugador3(numeroJugador) {
    return localStorage.getItem(`nombreJugador${numeroJugador}`);
}
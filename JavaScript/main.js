function obtenerEleccionAleatoria() {
    return Math.floor(Math.random() * 2) + 1;
}

function obtenerEleccionPorConsola(nombreJugador) {
    let eleccion = parseInt(prompt(nombreJugador + ', elige 1 o 2:'));

    while (isNaN(eleccion) || (eleccion !== 1 && eleccion !== 2)) {
        alert('Por favor, elige solo 1 o 2.');
        eleccion = parseInt(prompt(nombreJugador + ', elige 1 o 2:'));
    }

    return eleccion;
}

function determinarGanador(jugador1, jugador2, jugador3) {
    if (jugador1 === jugador2 && jugador2 === jugador3) {
        return null; // Empate
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

function jugarJuego() {
    console.log('¡Bienvenido al juego 2 o 1!');

    const totalRondas = parseInt(prompt('Ingrese el número de rondas:'));

    let victoriasJugador1 = 0;
    let victoriasJugador2 = 0;
    let victoriasJugador3 = 0;
    let empates = 0;
    let tiempoTotal = 0;

    for (let ronda = 1; ronda <= totalRondas; ronda++) {
        console.log('\nRonda ' + ronda);

        const inicioPartida = new Date(); // Tiempo de inicio de la partida

        const eleccionJugador1 = obtenerEleccionPorConsola('Jugador 1');
        const eleccionJugador2 = obtenerEleccionPorConsola('Jugador 2');
        const eleccionJugador3 = obtenerEleccionAleatoria();

        const finPartida = new Date(); // Tiempo de fin de la partida
        const tiempoPartida = (finPartida - inicioPartida) / 1000; // Tiempo en segundos
        tiempoTotal += tiempoPartida;

        console.log('Jugador 1 eligió: ' + eleccionJugador1);
        console.log('Jugador 2 eligió: ' + eleccionJugador2);
        console.log('Jugador 3 eligió: ' + eleccionJugador3);
        console.log('Tiempo de partida: ' + tiempoPartida + ' segundos');

        const ganador = determinarGanador(eleccionJugador1, eleccionJugador2, eleccionJugador3);

        if (ganador === null) {
            console.log('¡Empate en esta ronda!');
            empates++;
        } else {
            console.log('¡El jugador ' + ganador + ' ganó en esta ronda!');

            if (ganador === 1) {
                victoriasJugador1++;
            } else if (ganador === 2) {
                victoriasJugador2++;
            } else {
                victoriasJugador3++;
            }
        }
    }

    console.log('\nResultados finales:');
    const resultados = [
        { jugador: 'Jugador 1', victorias: victoriasJugador1 },
        { jugador: 'Jugador 2', victorias: victoriasJugador2 },
        { jugador: 'Jugador 3', victorias: victoriasJugador3 }
    ];

    resultados.sort((a, b) => b.victorias - a.victorias);

    resultados.forEach((resultado, indice) => {
        console.log(`Posición ${indice + 1}: ${resultado.jugador} - ${resultado.victorias} victorias`);
    });

    console.log(`Total de partidas ganadas: ${victoriasJugador1 + victoriasJugador2 + victoriasJugador3}`);
    console.log(`Total de partidas empatadas: ${empates}`);
    console.log(`Tiempo total de todas las partidas: ${tiempoTotal} segundos`);
}

jugarJuego();

function obtenerTiempoPartida() {
    // Devuelve un tiempo aleatorio entre 5 y 15 segundos (puedes ajustar el rango según sea necesario)
    return Math.floor(Math.random() * 11) + 5;
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

        const inicioPartida = new Date(); // Registro de tiempo de inicio

        const eleccionJugador1 = obtenerEleccionPorConsola('Jugador 1');
        const eleccionJugador2 = obtenerEleccionPorConsola('Jugador 2');
        const eleccionJugador3 = obtenerEleccionAleatoria();

        const finPartida = new Date(); // Registro de tiempo de fin
        const tiempoPartida = (finPartida - inicioPartida) / 1000; // Tiempo en segundos

        console.log('Jugador 1 eligió: ' + eleccionJugador1);
        console.log('Jugador 2 eligió: ' + eleccionJugador2);
        console.log('Jugador 3 eligió: ' + eleccionJugador3);
        console.log('Tiempo de partida: ' + tiempoPartida + ' segundos');

        tiempoTotal += tiempoPartida;

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

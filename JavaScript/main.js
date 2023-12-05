function obtenerEleccionAleatoria() {   //seleccion aleatoria para jugador 3
    return Math.floor(Math.random() * 2) + 1;
}


function obtenerEleccionPorConsola(nombreJugador) {   // seleccion manual de los jugadores 1 y 2
    let eleccion = parseInt(prompt(nombreJugador + ', elige 1 o 2:'));

    
    while (isNaN(eleccion) || (eleccion !== 1 && eleccion !== 2)) {  // verificar que elijan solo 1 o 2
        alert('Por favor, elige solo 1 o 2.');
        eleccion = parseInt(prompt(nombreJugador + ', elige 1 o 2:'));
    }

    return eleccion;
}


function determinarGanador(jugador1, jugador2, jugador3) { //buscar al ganador
    if (jugador1 === jugador2 && jugador2 === jugador3) {
        return null; // Empate
    }  else {
        
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

    
    const totalRondas = parseInt(prompt('Ingrese el número de rondas:')); //preguntamos el numero de rondas que quieren

    let victoriasJugador1 = 0; // contadores para las victorias 
    let victoriasJugador2 = 0;
    let victoriasJugador3 = 0;

    for (let ronda = 1; ronda <= totalRondas; ronda++) {
        console.log('\nRonda ' + ronda);

        // Elecciones de los jugadores
        const eleccionJugador1 = obtenerEleccionPorConsola('Jugador 1');
        const eleccionJugador2 = obtenerEleccionPorConsola('Jugador 2');
        const eleccionJugador3 = obtenerEleccionAleatoria(); 

        console.log('Jugador 1 eligió: ' + eleccionJugador1);
        console.log('Jugador 2 eligió: ' + eleccionJugador2);
        console.log('Jugador 3 eligió: ' + eleccionJugador3);

        // Determina al ganador
        const ganador = determinarGanador(eleccionJugador1, eleccionJugador2, eleccionJugador3);

        if (ganador === null) {
            console.log('¡Empate en esta ronda!');
        } else {
            console.log('¡El jugador ' + ganador + ' ganó en esta ronda!');
            
            if (ganador === 1) {  //incrementamos los contadores de las victorias
                victoriasJugador1++;
            } else if (ganador === 2) {
                victoriasJugador2++;
            } else {
                victoriasJugador3++;
            }
        }
    }

    // Muestra los resultados finales ordenados de mayor a menor
    console.log('\nResultados finales:');
    const resultados = [
        { jugador: 'Jugador 1', victorias: victoriasJugador1 },
        { jugador: 'Jugador 2', victorias: victoriasJugador2 },
        { jugador: 'Jugador 3', victorias: victoriasJugador3 }
    ];

    // Ordenar el array de resultados en orden descendente por victorias
    resultados.sort((a, b) => b.victorias - a.victorias);

    // Mostrar los resultados ordenados
    resultados.forEach((resultado, indice) => {
        console.log(`Posición ${indice + 1}: ${resultado.jugador} - ${resultado.victorias} victorias`);
    });
}

jugarJuego(); //inicializamos de nuevo

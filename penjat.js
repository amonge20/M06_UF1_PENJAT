//PARTE 1
function Penjat() {
    let partidas = 0;
    let partidasGanadas = 0;
    let partidasPerdidas = 0;

    while (true) {
      let selecciona = prompt("Selecciona una de las opciones: \n 1. Iniciar un juego \n 2. Estadísticas \n 3. Salir \n");

      if (selecciona === '1') {
        console.log("Has seleccionado iniciar el juego...");
        const palabras = ["portatil", "raton", "teclado", "ordenador", "programacion"];
        const palabraSuelta = palabras[Math.floor(Math.random() * palabras.length)].toLowerCase();
        const palabrAdivina = Array(palabraSuelta.length).fill('_');
        const letraFalla = [];
        let intentos = 6;

        while (intentos > 0) {
          console.log(`Palabra: ${palabrAdivina.join(' ')}`);
          console.log(`Intentos restantes: ${intentos}`);
          console.log(`Letras falladas: ${letraFalla.join(' ')}`);

          const letra = prompt("Pon una letra: ").toLowerCase();

          if (letra.length !== 1 || !letra.match(/[a-z]/)) {
            console.log("Pon una letra válida: ");
            continue;
          }

          if (palabraSuelta.includes(letra)) {
            for (let i = 0; i < palabraSuelta.length; i++) {
              if (palabraSuelta[i] === letra) {
                palabrAdivina[i] = letra;
              }
            }
          } else {
            letraFalla.push(letra);
            intentos--;
          }

          if (palabraSuelta === palabrAdivina.join('')) {
            console.log(`¡Felicidades! Has adivinado la palabra: ${palabraSuelta}`);
            partidas++;
            partidasGanadas++;
            break; // El juego termina y regresamos al menú.
          }
        }

        if (intentos === 0) {
          console.log(`Has perdido. La palabra era: ${palabraSuelta}`);
          partidas++;
          partidasPerdidas++; // El juego termina y regresamos al menú.
        }

      } else if (selecciona === '2') {
          console.log("Has seleccionado las estadísticas del juego");
          console.log(`Partidas jugadas en total: ${partidas}`);
          console.log(`Partidas ganadas: ${partidasGanadas}`);
          console.log(`Partidas perdidas: ${partidasPerdidas}`);
      } else if (selecciona === '3') {
          console.log("Chao Chao");
          break; // Salir del juego.
      } else {
          console.log("No has elegido ninguna de las opciones, cerrando programa");
          break; // Salir del juego.
        }
    }
}

//PARTE 2
function nuevaPartida(){
  //IMAGEN DEL AHORCADO
  // var personAhorcandose = getElementById("juegoColgao");
  // personAhorcandose = ['']
  // var img1 = new Image();
  // var src1 = 'img/penjat_0';
  // img1.src = src1

  // var src2 = 'img/penjat_0';
  // var src3 = 'img/penjat_0';
  // var src4 = 'img/penjat_0';
  // var src5 = 'img/penjat_0';
  // var src6 = 'img/penjat_0';
  // var src7 = 'img/penjat_0';
  // var src8 = 'img/penjat_0';
  // let intentos = 7;

  //LETRA OCULTA DEL AHORCADO
  

  //INICIAR LA PARTIDA: ABECEDARIO DEL AHORCADO
  const abecedario = 'abcdefghijklmopqrstuvwxyz';

  document.getElementById("Iniciar").addEventListener("click", function() {
    const abecedarioMostrar = abecedario.split('');
    const abecedarioDividir = document.getElementById("abecedario");
    abecedarioDividir.innerHTML= '';

    abecedarioMostrar.forEach(lletra => {
      const buto = document.createElement('button');
      buto.textContent = lletra;
      abecedarioDividir.appendChild(buto);
    });
  });
  
  
  //LETRAS SELECCIONADAS EN EL AHORCADO
  // let letrasCogidas = [];

  //CUANDO GANAS O PIERDES

}

//ESTADISTICAS (QUE GUARDE LAS PARTIDAS DEL AHORCADO)
function estadisticas(){
  // let partidasTotales = 0;
  // let partidasGanadas = 0;
  // let partidasPerdidas = 0;

  
}
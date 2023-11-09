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

//PARTE 2: AHORCADO VERSION FINAL
//ARRAY DE IMÁGENES DEL AHORCADO
const hangmanImages = [
  "",
  "img/penjat_0.png",
  "img/penjat_1.png",
  "img/penjat_2.png",
  "img/penjat_3.png",
  "img/penjat_4.png",
  "img/penjat_5.png",
  "img/penjat_6.png",
  "img/penjat_7.png"
];

// DATOS DEL AHORCADO
let palabrAdivinar = "";
let palabraOculta = [];
let letrasUsadas = [];
let intentos = 7;
let partidas = 0;
let partidasGanadas = 0;
let partidasPerdidas = 0;
let hangmanImageIndex = 0;

//ELEGIMOS LAS PALABRAS OCULTAS DEL AHORCADO
const palabras = ["ordenador", "portatil", "teclado", "raton", "gaming", "javascript", "programacion"];

//INICIO DE LA PARTIDA
function nuevaPartida() {
  // Selecciona una palabra al azar
  palabrAdivinar = palabras[Math.floor(Math.random() * palabras.length)];

  palabraOculta = new Array(palabrAdivinar.length).fill("_");
  letrasUsadas = [];

  // ABECEDARIO DEL AHORCADO
  const abecedario = 'abcdefghijklmnopqrstuvwxyz';
  const abecedarioMostrar = abecedario.split('');
  const abecedarioDividir = document.getElementById("abecedario");
  abecedarioDividir.innerHTML = '';

  abecedarioMostrar.forEach(letra => {
    const button = document.createElement('button');
    button.textContent = letra;
    button.addEventListener("click", function () {
      lletrAdivinada(letra);
      button.disabled = true;
    });
    abecedarioDividir.appendChild(button);
  });

  document.getElementById("letrasUsadas").textContent = "";
  document.getElementById("palabraOculta").textContent = palabraOculta.join(" ");
  intentos = 7;
  hangmanImageIndex = 0;
  document.getElementById("personaColgada").style.display = "none";
  document.getElementById("personaColgada").src = hangmanImages[hangmanImageIndex];
}

// Modificar la función lletrAdivinada
function lletrAdivinada(letra) {
  if (!letrasUsadas.includes(letra)) {
    letrasUsadas.push(letra);
    document.getElementById("letrasUsadas").textContent = "Letras usadas: " + letrasUsadas.join(", ");

    if (palabrAdivinar.includes(letra)) {
      for (let i = 0; i < palabrAdivinar.length; i++) {
        if (palabrAdivinar[i] === letra) {
          palabraOculta[i] = letra;
        }
      }
    } else {
      intentos--;
      // Change the hangman image
      document.getElementById("personaColgada").style.display = "block";
      if (hangmanImageIndex < hangmanImages.length - 1) {
        hangmanImageIndex++;
      }
      document.getElementById("personaColgada").src = hangmanImages[hangmanImageIndex];
    }

    document.getElementById("palabraOculta").textContent = palabraOculta.join(" ");

    if (intentos === 0) {
      partidas++;
      partidasPerdidas++;
      document.getElementById("palabraOculta").textContent = `Game Over. La palabra oculta era: ${palabrAdivinar}`;
      setTimeout(() => {
        nuevaPartida();
      }, 2000); // Espera 2 segundos antes de iniciar una nueva partida
    } else if (!palabraOculta.includes("_")) {
      partidas++;
      partidasGanadas++;
      const ultimaPalabraAdivinada = palabraOculta.join("");
      document.getElementById("palabraOculta").textContent = `¡YOU WON! La palabra oculta era: ${ultimaPalabraAdivinada}`;
      setTimeout(() => {
        nuevaPartida();
      }, 2000); // Espera 2 segundos antes de iniciar una nueva partida
    }
  }
}

// ESTADISTICAS (QUE GUARDE LAS PARTIDAS DEL AHORCADO)
function estadisticas() {
  const porcentajeGanadas = (partidasGanadas / partidas) * 100;
  const porcentajePerdidas = (partidasPerdidas / partidas) * 100;

  const porcentajeGanadasStr = porcentajeGanadas.toFixed(2);
  const porcentajePerdidasStr = porcentajePerdidas.toFixed(2);

  // Verifica si los porcentajes son números enteros (sin decimales)
  const porcentajeGanadasMostrar = Number.isInteger(porcentajeGanadas) ? porcentajeGanadas.toFixed(0) : porcentajeGanadasStr;
  const porcentajePerdidasMostrar = Number.isInteger(porcentajePerdidas) ? porcentajePerdidas.toFixed(0) : porcentajePerdidasStr;

  alert(`Partidas Totales: ${partidas}\nPartidas Ganadas: ${partidasGanadas} (${porcentajeGanadasMostrar}%)\nPartidas Perdidas: ${partidasPerdidas} (${porcentajePerdidasMostrar}%)`);
}
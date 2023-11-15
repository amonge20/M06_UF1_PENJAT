//AHORCADO VERSION FINAL
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

//UN CONST PARA QUE LAS PARTIDAS SE GUARDEN
const ahorcadoPartidasGuardadas = JSON.parse(localStorage.getItem("ahorcadoGuardarDatos")) || {
  partidas: 0,
  partidasGanadas: 0,
  partidasPerdidas: 0,
};

// DATOS DEL AHORCADO
let palabrAdivinar = "";
let palabraOculta = [];
let letrasUsadas = [];
let intentos = 7;
let partidas = ahorcadoPartidasGuardadas.partidas;
let partidasGanadas = ahorcadoPartidasGuardadas.partidasGanadas;
let partidasPerdidas = ahorcadoPartidasGuardadas.partidasPerdidas;
let hangmanImageIndex = 0;

//Una array de palabras ocultas del ahorcado
const palabras = ["ORDENADOR", "PORTATIL", "TECLADO", "RATON", "GAMING", "JAVASCRIPT", "PROGRAMACION", "PHPYTHON", "OBJETOS"];

//INICIO DE LA PARTIDA
function nuevaPartida() {
  // Selecciona una palabra al azar de la variable palabras
  palabrAdivinar = palabras[Math.floor(Math.random() * palabras.length)];

  //Se convertira en rallas la palabra oculta
  palabraOculta = new Array(palabrAdivinar.length).fill("_");
  letrasUsadas = [];

  //Abecedario del ahorcado y declaramos el DOM del abecedario
  const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const abecedarioMostrar = abecedario.split('');
  const abecedarioDividir = document.getElementById("abecedario");
  abecedarioDividir.innerHTML = '';

  //Cada letra que se seleccione clicando se ira desactivando
  abecedarioMostrar.forEach(letra => {
    const button = document.createElement('button');
    button.textContent = letra;
    button.addEventListener("click", function () {
      lletrAdivinada(letra);
      button.disabled = true;
    });
    abecedarioDividir.appendChild(button);
  });

  /*Se cogera las palabras que has usado y tambien se irán añadiendo a las palabras que vayas adivinando en la palabra oculta
  Tambien se ira cambiando de imagen por el numero de intentos (Se coge el DOM delas letras usadas, ocultas y imagenes de la persona ahorcada)*/
  document.getElementById("letrasUsadas").textContent = "";
  document.getElementById("palabraOculta").textContent = palabraOculta.join(" ");
  intentos = 7;
  hangmanImageIndex = 0;
  document.getElementById("personaColgada").style.display = "none";
  document.getElementById("personaColgada").src = hangmanImages[hangmanImageIndex];
}

//En la funcion "lletrAdivinada" se ira añadiendo las letras que has usado durante la partida del ahorcado (DOM de las letras usadas)
function lletrAdivinada(letra) {
  if (!letrasUsadas.includes(letra)) {
    letrasUsadas.push(letra);
    document.getElementById("letrasUsadas").textContent = "Letras usadas: " + letrasUsadas.join(", ");

    //Esa palabra que has seleccionado ira en la palabra oculta y se añadira en el texto de "letras usadas"
    if (palabrAdivinar.includes(letra)) {
      for (let i = 0; i < palabrAdivinar.length; i++) {
        if (palabrAdivinar[i] === letra) {
          palabraOculta[i] = letra;
        }
      }
      //O sino te ira quitando intentos 
    } else {
      intentos--;
      //Imagen dela persona ahorcada
      document.getElementById("personaColgada").style.display = "block";
      if (hangmanImageIndex < hangmanImages.length - 1) {
        hangmanImageIndex++;
      }
      document.getElementById("personaColgada").src = hangmanImages[hangmanImageIndex];
    }

    document.getElementById("palabraOculta").textContent = palabraOculta.join(" ");

    //Si el numero de intentos llega a 0, se acabo la partida y empezara una de nueva (Luego se añadira como partida jugada en estadisticas)
    if (intentos === 0) {
      partidas++;
      partidasPerdidas++;
      document.getElementById("palabraOculta").textContent = `Game Over. La palabra oculta era: ${palabrAdivinar}`;
      //Si se acierta se mostrara la palabra adivinada y empezara una de nueva (Luego se añadira como partida jugada en estadisticas)
    } else if (!palabraOculta.includes("_")) {
      partidas++;
      partidasGanadas++;
      const ultimaPalabraAdivinada = palabraOculta.join("");
      document.getElementById("palabraOculta").textContent = `¡YOU WON! La palabra oculta era: ${ultimaPalabraAdivinada}`;
    }
  }
}

// Estadisticas (Que guarde las partidas del ahorcado)
function estadisticas() {
  const porcentajeGanadas = (partidasGanadas / partidas) * 100;
  const porcentajePerdidas = (partidasPerdidas / partidas) * 100;

  const porcentajeGanadasStr = porcentajeGanadas.toFixed(2);
  const porcentajePerdidasStr = porcentajePerdidas.toFixed(2);

  // Verifica si los porcentajes son números enteros (sin decimales)
  const porcentajeGanadasMostrar = Number.isInteger(porcentajeGanadas) ? porcentajeGanadas.toFixed(0) : porcentajeGanadasStr;
  const porcentajePerdidasMostrar = Number.isInteger(porcentajePerdidas) ? porcentajePerdidas.toFixed(0) : porcentajePerdidasStr;

  alert(`Partidas Totales: ${partidas}\nPartidas Ganadas (${porcentajeGanadasMostrar}%): ${partidasGanadas} \nPartidas Perdidas (${porcentajePerdidasMostrar}%): ${partidasPerdidas}`);
}

//Creamos una funcion en que elimine los datos del ahorcado
function eliminarEstadisticas(){
    localStorage.removeItem("ahorcadoPartidas");
    partidas = 0,
    partidasGanadas = 0,
    partidasPerdidas = 0,
    estadisticas();
}

//Declaramos el ID del boton de eliminar las estadisticas
document.getElementById("botonEliminar").addEventListener("click", eliminarEstadisticas);

//En el "addEventListener" hara que los datos que se hayan guardado pues se eliminaran
window.addEventListener("beforeunload", function() {
  const ahorcadoPartidas = [
    partidas,
    partidasGanadas,
    partidasPerdidas
  ];
  localStorage.setItem("hangmanData", JSON.stringify(ahorcadoPartidas));
});
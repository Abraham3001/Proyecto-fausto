const tarjetasBase = [
  { id: 1, texto: "LMA sin diferenciación" },
  { id: 1, texto: "Mieloblastos sin gránulos azurófilos" },
  { id: 2, texto: "LMA tipo II" },
  { id: 2, texto: "Mieloblastos con bastones de Auer" },
  { id: 3, texto: "LLA tipo B" },
  { id: 3, texto: "Proliferación de linfoblastos B" },
  { id: 4, texto: "LLA tipo T" },
  { id: 4, texto: "Origen en linfocitos T maduros" }
];

let tarjetas = [];
let primeraCarta = null;
let segundaCarta = null;
let bloqueo = false;
let intentos = 0;

function mezclarTarjetas() {
  tarjetas = [...tarjetasBase].sort(() => Math.random() - 0.5);
}

function crearTablero() {
  const tablero = document.getElementById("tablero");
  tablero.innerHTML = "";
  tarjetas.forEach((item, index) => {
    const carta = document.createElement("div");
    carta.className = "carta oculta";
    carta.dataset.id = item.id;
    carta.dataset.index = index;
    carta.textContent = item.texto;
    carta.addEventListener("click", () => voltearCarta(carta));
    tablero.appendChild(carta);
  });
}

function voltearCarta(carta) {
  if (bloqueo || carta.classList.contains("correcta") || carta === primeraCarta) return;

  carta.classList.remove("oculta");
  carta.style.color = "#333";

  if (!primeraCarta) {
    primeraCarta = carta;
  } else {
    segundaCarta = carta;
    bloqueo = true;
    intentos++;
    document.getElementById("contador").textContent = `Intentos: ${intentos}`;
    
    if (primeraCarta.dataset.id === segundaCarta.dataset.id) {
      primeraCarta.classList.add("correcta");
      segundaCarta.classList.add("correcta");
      resetSeleccion();
    } else {
      setTimeout(() => {
        primeraCarta.classList.add("oculta");
        segundaCarta.classList.add("oculta");
        primeraCarta.style.color = "transparent";
        segundaCarta.style.color = "transparent";
        resetSeleccion();
      }, 1000);
    }
  }
}

function resetSeleccion() {
  primeraCarta = null;
  segundaCarta = null;
  bloqueo = false;
}

function reiniciarJuego() {
  intentos = 0;
  document.getElementById("contador").textContent = `Intentos: 0`;
  mezclarTarjetas();
  crearTablero();
}

document.addEventListener("DOMContentLoaded", () => {
  reiniciarJuego();
});

const tamano = 15;
const grid = Array(tamano).fill(null).map(() => Array(tamano).fill(null));

const palabras = [
  {
    palabra: "MIELOBLASTO",
    pista: "Célula con núcleo y citoplasma específico.",
    fila: 0,
    columna: 0,
    direccion: "H"
  },
  {
    palabra: "BASTONESA",
    pista: "Estructuras visibles en mieloblasto tipo II.",
    fila: 2,
    columna: 1,
    direccion: "V"
  },
  {
    palabra: "M1",
    pista: "Clasificación FAB de LMA con poca diferenciación.",
    fila: 5,
    columna: 5,
    direccion: "H"
  },
  {
    palabra: "TIÑCIÓN",
    pista: "Procedimiento de laboratorio como Wright o mieloperoxidasa.",
    fila: 7,
    columna: 2,
    direccion: "V"
  },
  {
    palabra: "LEUCEMIA",
    pista: "Enfermedad hematológica.",
    fila: 3,
    columna: 5,
    direccion: "H"
  },
  {
    palabra: "CELULA",
    pista: "Unidad básica.",
    fila: 3,
    columna: 8, // "C" cruza con la "C" de LEUCEMIA
    direccion: "V"
  }
];

function colocarPalabras() {
  palabras.forEach(({ palabra, fila, columna, direccion }) => {
    for (let i = 0; i < palabra.length; i++) {
      const y = direccion === "H" ? fila : fila + i;
      const x = direccion === "H" ? columna + i : columna;

      // Validación de límites
      if (y >= tamano || x >= tamano) {
        console.warn(`Palabra "${palabra}" no cabe en la grilla desde (${fila}, ${columna})`);
        return;
      }

      const letraExistente = grid[y][x];

      // Si está vacío o es la misma letra (intersección válida), la colocamos
      if (!letraExistente || letraExistente === palabra[i]) {
        grid[y][x] = palabra[i];
      } else {
        console.warn(`Conflicto al colocar "${palabra}" en (${y}, ${x}). Ya existe: "${letraExistente}"`);
        return; // O podrías lanzar un error si prefieres
      }
    }
  });
}


function dibujarCrucigrama() {
  const contenedor = document.getElementById("crucigrama");
  contenedor.innerHTML = "";

  for (let y = 0; y < tamano; y++) {
    for (let x = 0; x < tamano; x++) {
      const input = document.createElement("input");
      input.className = "casilla";
      input.maxLength = 1;
      input.dataset.fila = y;
      input.dataset.columna = x;

      if (grid[y][x] === null) {
        input.disabled = true;
        input.classList.add("inactiva");
      }

      contenedor.appendChild(input);
    }
  }
}

function cargarPistas() {
  const ulH = document.getElementById("pistas-horizontales");
  const ulV = document.getElementById("pistas-verticales");

  ulH.innerHTML = "";
  ulV.innerHTML = "";

  palabras.forEach(({ pista, direccion }, idx) => {
    const li = document.createElement("li");
    li.textContent = `${idx + 1}. ${pista}`;
    if (direccion === "H") {
      ulH.appendChild(li);
    } else {
      ulV.appendChild(li);
    }
  });
}

function verificarRespuestas() {
  const inputs = document.querySelectorAll(".casilla");
  let aciertos = 0;

  palabras.forEach(({ palabra, fila, columna, direccion }) => {
    for (let i = 0; i < palabra.length; i++) {
      const y = direccion === "H" ? fila : fila + i;
      const x = direccion === "H" ? columna + i : columna;

      const input = [...inputs].find(
        el => +el.dataset.fila === y && +el.dataset.columna === x
      );

      if (input) {
        if (input.value.toUpperCase() === palabra[i]) {
          input.classList.add("correcto");
          input.classList.remove("incorrecto");
          aciertos++;
        } else {
          input.classList.add("incorrecto");
          input.classList.remove("correcto");
        }
      }
    }
  });

  document.getElementById("mensaje").textContent = `Respuestas correctas: ${aciertos}`;
}


document.addEventListener("DOMContentLoaded", () => {
  colocarPalabras();
  dibujarCrucigrama();
  cargarPistas();
});

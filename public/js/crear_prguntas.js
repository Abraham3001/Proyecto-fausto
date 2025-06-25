function agregarPregunta() {
    const container = document.getElementById("preguntas-container");

    const preguntaDiv = document.createElement("div");
    preguntaDiv.classList.add("pregunta", "mb-4", "border", "p-3", "rounded", "bg-light", "text-dark");

    preguntaDiv.innerHTML = `
      <div class="mb-2 d-flex justify-content-between align-items-center">
        <strong class="numero-pregunta"></strong>
        <button type="button" class="btn btn-sm btn-danger" onclick="eliminarPregunta(this)">Eliminar</button>
      </div>
      <div class="mb-2">
        <label>Texto de la pregunta:</label>
        <input type="text" name="texto[]" class="form-control" required>
      </div>
      <div>
        <label>Opción correcta:</label>
        <input type="text" name="respuesta[]" class="form-control" required>
      </div>
    `;

    container.appendChild(preguntaDiv);
    actualizarNumeros();
  }

  function eliminarPregunta(boton) {
    const divPregunta = boton.closest(".pregunta");
    divPregunta.remove();
    actualizarNumeros();
  }

  function actualizarNumeros() {
    const preguntas = document.querySelectorAll(".pregunta");
    preguntas.forEach((pregunta, index) => {
      const numero = pregunta.querySelector(".numero-pregunta");
      numero.textContent = `Pregunta ${index + 1}`;
    });
  }
const questions = [
  {
    texto: "Leucemia linfoblástica aguda L1, se caracteriza:",
    opciones: [
      "Linfoblastos pequeños, poseen escaso citoplasma basófilo sin gránulos", // ✅
      "Linfoblastos grandes, poseen escaso citoplasma basófilo sin gránulos",
      "Linfoblastos pequeños, poseen escaso citoplasma basófilo con gránulos",
      "Ninguno"
    ],
    correcta: 0
  },
  {
    texto: "Leucemia linfoblástica aguda L1, se caracteriza:",
    opciones: [
      "El núcleo ocupa la menor parte de la superficie y la cromatina es laxa gruesa",
      "el núcleo ocupa la mayor parte de la superficie y la cromatina es laxa fina",
      "El núcleo ocupa la mayor parte de la superficie y la cromatina es laxa gruesa", // ✅
      "Ninguno"
    ],
    correcta: 2
  },
  {
    texto: "Los linfoblastos pueden llegar a presentar la forma:",
    opciones: [
      "balón de futbol americano",
      'raquetas o "espejos de mano "', // ✅
      "Riñón",
      "Ninguno"
    ],
    correcta: 1
  },
  {
    texto: "Leucemia linfoblástica aguda L1, se caracteriza:",
    opciones: [
      "Linfoblastos de tamaño homogéneo, cromatina laxa-fina, sin evidencia de nucleolos, con hendidura nucleares",
      "Linfoblastos de tamaño homogéneo, cromatina laxa-gruesa, sin evidencia de nucleolos, sin hendidura nucleares",
      "Linfoblastos de tamaño homogéneo, cromatina laxa-gruesa, sin evidencia de nucleolos, con hendidura nucleares", // ✅
      "Ninguno"
    ],
    correcta: 2
  },
  {
    texto: "Leucemia linfoblástica aguda L2, se caracteriza:",
    opciones: [
      "Linfoblastos de tamaño regular, presentan una cromatina fina y nucleolos bien delimitados",
      "Linfoblastos de tamaño variable, presentan una cromatina gruesa y nucleolos bien delimitados",
      "Linfoblastos de tamaño variable, presentan una cromatina fina y nucleolos bien delimitados", // ✅
      "Ninguno"
    ],
    correcta: 2
  },
  {
    texto: "Leucemia linfoblástica aguda L2, se caracteriza:",
    opciones: [
      "Linfoblasto de tamaño grande, escaso citoplasma basófilo, núcleo grande con cromatina fina, evidencia un gran nucleolo", // ✅
      "Linfoblasto de tamaño grande, escaso citoplasma basófilo, núcleo pequeño con cromatina fina, evidencia un gran nucleolo",
      "Linfoblasto de tamaño grande, mucho citoplasma basófilo, núcleo grande con cromatina fina, evidencia un gran nucleolo",
      "Ninguno"
    ],
    correcta: 0
  },
  {
    texto: "Leucemia linfoblástica aguda L2, se caracteriza:",
    opciones: [
      "Linfoblasto con moderado citoplasma basófilo, evidencia vacuolización citoplásmica, posee un núcleo que ocupa la mayor parte de la célula, su cromatina es fina", // ✅
      "Linfoblasto con moderado citoplasma basófilo, evidencia vacuolización citoplásmica, posee un núcleo que ocupa la mayor parte de la célula, su cromatina es gruesa",
      "Linfoblasto con moderado citoplasma basófilo, evidencia vacuolización citoplásmica, posee un núcleo que ocupa la menor parte de la célula, su cromatina es fina",
      "Ninguno"
    ],
    correcta: 0
  },
  {
    texto: "Leucemia linfoblástica aguda L2, se caracteriza:",
    opciones: [
      "Linfoblastos de tamaño variable, poseen citoplasma basófilo, presentan núcleos irregulares con cromatina fina que evidencia nucleolos bien delimitados", // ✅
      "Linfoblastos de tamaño variable, no poseen citoplasma basófilo, presentan núcleos irregulares con cromatina fina que evidencia nucleolos bien delimitados",
      "Linfoblastos de tamaño variable, poseen citoplasma basófilo, presentan núcleos regulares con cromatina fina que evidencia nucleolos bien delimitados",
      "Ninguno"
    ],
    correcta: 0
  },
  {
    texto: "Leucemia linfoblástica aguda L3, se caracteriza:",
    opciones: [
      "Linfoblastos con citoplasma basófilo, cromatina fina y evidentes nucleolos prominentes.", // ✅
      "Linfoblastos con citoplasma basófilo, cromatina gruesa y evidentes nucleolos prominentes.",
      "Linfoblastos con citoplasma eosinófilo, cromatina fina y evidentes nucleolos prominentes.",
      "Ninguno"
    ],
    correcta: 0
  },
  {
    texto: "Leucemia linfoblástica aguda L3, se caracteriza:",
    opciones: [
      "Linfoblastos de tamaño medio y grande, poseen abundante citoplasma basófilo con vacuolización citoplásmica, presentan núcleos irregulares con cromatina fina, evidencian nucleolos", // ✅
      "Linfoblastos de tamaño medio y grande, poseen poco citoplasma basófilo con vacuolización citoplásmica, presentan núcleos irregulares con cromatina fina, evidencian nucleolos",
      "Linfoblastos de tamaño medio y grande, poseen abundante citoplasma basófilo con vacuolización citoplásmica, presentan núcleos regulares con cromatina fina, evidencian nucleolos",
      "Ninguno"
    ],
    correcta: 0
  },
  {
    texto: "Linfoma de Burkitt, se caracteriza:",
    opciones: [
      "Estos presentan un número mayor de vacuolas citoplásmicas, el citoplasma adquiere un color azul turquesa, comúnmente se le conoce como 'célula con aspecto de tipo cielo estrellado", // ✅
      "Estos presentan un número mayor de vacuolas citoplásmicas, el citoplasma adquiere un color verde turquesa, comúnmente se le conoce como 'célula con aspecto de tipo cielo estrellado",
      "Estos presentan un número menor de vacuolas citoplásmicas, el citoplasma adquiere un color azul turquesa, comúnmente se le conoce como 'célula con aspecto de tipo cielo estrellado",
      "Ninguno"
    ],
    correcta: 0
  },
  {
    texto: "Leucemia linfocítica crónica, se caracteriza:",
    opciones: [
      "Linfocitos de tamaño pequeño, con escaso citoplasma y núcleos redondos con cromatina condensada y sin nucleolos evidentes", // ✅
      "Linfocitos de tamaño grande, con escaso citoplasma y núcleos redondos con cromatina condensada y sin nucleolos evidentes",
      "Linfocitos de tamaño mediano, con escaso citoplasma y núcleos redondos con cromatina condensada y sin nucleolos evidentes",
      "Ninguno"
    ],
    correcta: 0
  },
  {
    texto: "Leucemia linfocítica crónica, se caracteriza:",
    opciones: [
      "Linfocitos pequeños con escaso citoplasma basófilo sin evidencia de granulación, núcleos regulares que ocupan la mayor parte de la célula, presentan cromatina condensada sin evidenciar nucleolos, se observa un neutrófilo y tres sombras de Gumprecht.", // ✅
      "Linfocitos grandes con escaso citoplasma basófilo sin evidencia de granulación, núcleos regulares que ocupan la mayor parte de la célula, presentan cromatina condensada sin evidenciar nucleolos, se observa un neutrófilo y tres sombras de Gumprecht.",
      "Linfocitos medianos con escaso citoplasma basófilo sin evidencia de granulación, núcleos regulares que ocupan la mayor parte de la célula, presentan cromatina condensada sin evidenciar nucleolos, se observa un neutrófilo y tres sombras de Gumprecht.",
      "Ninguno"
    ],
    correcta: 0
  },
  {
    texto: "Leucemia linfocítica crónica, se caracteriza:",
    opciones: [
      "Linfocitos pequeños, sin citoplasma, núcleos regulares y cromatina condensada que presenta aspecto cuarteado.",
      "Linfocitos pequeños, con escaso citoplasma, núcleos regulares y cromatina condensada que presenta aspecto cuarteado.", // ✅
      "Linfocitos pequeños, con escaso citoplasma, núcleos irregulares y cromatina condensada que presenta aspecto cuarteado.",
      "Ninguno"
    ],
    correcta: 1
  },
  {
    texto: "Leucemia de células Natural Killer (NK), se caracteriza:",
    opciones: [
      "Célula de tamaño grande presenta abundante citoplasma basófilo, denota una granulación azurofila gruesa y un núcleo regular que posee una cromatina condensada sin evidencia de nucleolos", // ✅
      "Célula de tamaño pequeño presenta abundante citoplasma basófilo, denota una granulación azurofila gruesa y un núcleo regular que posee una cromatina condensada sin evidencia de nucleolos",
      "Célula de tamaño grande presenta poco citoplasma basófilo, denota una granulación azurofila gruesa y un núcleo regular que posee una cromatina condensada sin evidencia de nucleolos",
      "Ninguno"
    ],
    correcta: 0
  },
  {
    texto: "Leucemia prolinfocítica, se caracteriza:",
    opciones: [
      "Prolinfocito: célula de medio-grande, presenta un citoplasma abundante con moderada basofilia. Su nucleo es redondo u oval, puede ser regular o irregular, con un patrón de cromatina en grumos y aun conserva un nucleolo no bien definido", // ✅
      "Prolinfocito: célula de medio-grande, presenta poco  citoplasma  con moderada basofilia. Su nucleo es redondo u oval, puede ser regular o irregular, con un patrón de cromatina en grumos y aun conserva un nucleolo no bien definido",
      "Prolinfocito: célula de medio-grande, presenta poco  citoplasma  con moderada basofilia. Su nucleo es redondo u oval, puede ser regular o irregular, con un patrón de cromatina en grumos y aun conserva un nucleolo bien definido",
      "Ninguno"
    ],
    correcta: 0
  },
  {
    texto: "Leucemia prolinfocítica, se caracteriza:",
    opciones: [
      "Prolinfocitos poco  citoplasma moderadamente basófilo, núcleos uniformes, con cromatina laxa-gruesa y evidencian un nucleolo poco definido",
      "Prolinfocitos con abundante citoplasma moderadamente basófilo, núcleos uniformes, con cromatina laxa-fina y evidencian un nucleolo poco definido",
      "Prolinfocitos con abundante citoplasma moderadamente basófilo, núcleos uniformes, con cromatina laxa-gruesa y evidencian un nucleolo poco definido", // ✅
      "Ninguno"
    ],
    correcta: 2
  }
];

window.onload = function () {
  const form = document.getElementById("quizForm");
  const navBtnsContainer = document.getElementById("navBtns");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");
  const resultado = document.getElementById("resultado");
  const feedbackDiv = document.getElementById("feedback");

  const modal = document.getElementById("confirmModal");
  const confirmYes = document.getElementById("confirmYes");
  const confirmNo = document.getElementById("confirmNo");

  let currentQuestion = 0;

  // Crear preguntas y ocultar todas menos la primera
  questions.forEach((q, idx) => {
    const div = document.createElement("div");
    div.className = "question";
    div.id = `question-${idx}`;
    div.style.display = idx === 0 ? "block" : "none";

    const questionText = document.createElement("p");
    questionText.textContent = `${idx + 1}. ${q.texto}`;
    questionText.style.fontWeight = "bold";
    div.appendChild(questionText);

    q.opciones.forEach((opcion, i) => {
      const label = document.createElement("label");
      label.style.cursor = "pointer";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${idx}`;
      input.value = i;
      input.style.marginRight = "8px";

      label.appendChild(input);
      label.append(` ${opcion}`);

      div.appendChild(label);
    });

    form.appendChild(div);
  });

  // Crear botones numerados para navegar
  questions.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.className = "nav-btn";
    btn.textContent = i + 1;
    btn.onclick = function (e) {
      e.preventDefault();
      mostrarPregunta(i);
    };
    navBtnsContainer.appendChild(btn);
  });

  // Mostrar pregunta dada por índice
  function mostrarPregunta(index) {
    if (index < 0 || index >= questions.length) return;

    for (let i = 0; i < questions.length; i++) {
      const el = document.getElementById(`question-${i}`);
      el.style.display = i === index ? "block" : "none";
    }
    currentQuestion = index;
    actualizarBotonesActivos();
  }

  // Actualizar botones activos y habilitar/deshabilitar avanzar/retroceder
  function actualizarBotonesActivos() {
    const navBtns = document.querySelectorAll(".nav-btn");
    navBtns.forEach((btn, i) => {
      btn.classList.toggle("active", i === currentQuestion);
    });

    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = currentQuestion === questions.length - 1;
  }

  // Avanzar y retroceder
  prevBtn.onclick = () => {
    if (currentQuestion > 0) mostrarPregunta(currentQuestion - 1);
  };

  nextBtn.onclick = () => {
    if (currentQuestion < questions.length - 1) mostrarPregunta(currentQuestion + 1);
  };

  // Confirmación con modal para enviar respuestas
  submitBtn.onclick = function (e) {
    e.preventDefault();
    modal.style.display = "flex";
  };

  confirmNo.onclick = function () {
    modal.style.display = "none";
  };

  confirmYes.onclick = function () {
    modal.style.display = "none";
    evaluarRespuestas();
  };

  // Cerrar modal si clic fuera del contenido
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Evaluar respuestas y mostrar resultado + retroalimentación
  function evaluarRespuestas() {
    let correctas = 0;
    let feedbackHTML = `<h3>Retroalimentación detallada:</h3><ul style="list-style:none; padding-left:0;">`;

    questions.forEach((q, idx) => {
      const selected = form.querySelector(`input[name="q${idx}"]:checked`);
      const div = document.getElementById(`question-${idx}`);
      div.classList.remove("correct", "incorrect");

      let estaCorrecta = false;
      if (selected) {
        if (parseInt(selected.value) === q.correcta) {
          div.classList.add("correct");
          correctas++;
          estaCorrecta = true;
        } else {
          div.classList.add("incorrect");
        }
      } else {
        div.classList.add("incorrect");
      }

      const respuestaCorrectaTexto = q.opciones[q.correcta];
      const respuestaUsuario = selected ? q.opciones[selected.value] : "<em>No respondió</em>";

      feedbackHTML += `<li style="margin-bottom:10px; padding:10px; background: rgba(255,255,255,0.1); border-radius:8px;">
        <strong>Pregunta ${idx + 1}:</strong> ${estaCorrecta ? '<span style="color:#28a745;">Correcta ✔</span>' : '<span style="color:#dc3545;">Incorrecta ✘</span>'}<br>
        Tu respuesta: ${respuestaUsuario}<br>
        Respuesta correcta: <strong>${respuestaCorrectaTexto}</strong>
      </li>`;
    });

    feedbackHTML += "</ul>";

    resultado.innerHTML = `Respuestas correctas: <strong>${correctas} de ${questions.length}</strong>`;
    feedbackDiv.innerHTML = feedbackHTML;
  }

  // Inicializar primera pregunta
  mostrarPregunta(0);
};
document.addEventListener("DOMContentLoaded", function() {
    const tipoPreguntaRadios = document.getElementsByName("tipoPregunta");
    const numeroIncisosInput = document.getElementById("numeroIncisos");
    const incisosContainer = document.getElementById("incisos-container");
    const incisosDiv = document.getElementById("incisos");
    const questionForm = document.getElementById("question-form");

    // Mostrar/ocultar campos según el tipo de pregunta
    tipoPreguntaRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.value === "cerrada") {
                incisosContainer.style.display = "block"; // Mostrar incisos para preguntas cerradas
            } else {
                incisosContainer.style.display = "none"; // Ocultar incisos para preguntas abiertas
                incisosDiv.innerHTML = ''; // Limpiar incisos si se elige abierta
            }
        });
    });

    // Evitar la entrada de letras y caracteres no válidos
    numeroIncisosInput.addEventListener("input", function() {
        this.value = this.value.replace(/[^0-9]/g, ''); // Permitir solo números
    });

    // Escuchar cambios en el número de incisos
    numeroIncisosInput.addEventListener("change", function() {
        const numeroIncisos = parseInt(this.value);
        incisosDiv.innerHTML = ''; // Limpiar incisos antes de agregar nuevos
        if (numeroIncisos > 0) {
            for (let i = 1; i <= numeroIncisos; i++) {
                const div = document.createElement("div");
                div.className = "mb-3";
                div.innerHTML = `
                    <label for="inciso${i}" class="form-label">Inciso ${i}:</label>
                    <input type="text" id="inciso${i}" name="inciso${i}" class="form-control" required>
                    <label for="respuesta${i}" class="form-label">Respuesta correcta:</label>
                    <input type="text" id="respuesta${i}" name="respuesta${i}" class="form-control" required>
                `;
                incisosDiv.appendChild(div);
            }
        }
    });

    // Evitar la entrada de letras y caracteres no válidos en los incisos
    questionForm.addEventListener("submit", function(event) {
        const incisos = [];
        for (let i = 1; i <= parseInt(numeroIncisosInput.value); i++) {
            const incisoValue = document.getElementById(`inciso${i}`).value;
            const respuestaValue = document.getElementById(`respuesta${i}`).value;

            if (incisoValue === "" || respuestaValue === "") {
                alert("Por favor, completa todos los incisos y respuestas.");
                event.preventDefault();
                return;
            }

            incisos.push({ inciso: incisoValue, respuesta: respuestaValue });
        }

        // Al enviar el formulario, se pueden almacenar los incisos junto con la pregunta si se desea
        // Lógica adicional para almacenar incisos si es necesario
    });
});

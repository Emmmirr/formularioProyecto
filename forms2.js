let optionCount = 1; // Contador para las opciones
let questionCount = 1; // Contador para las preguntas

 function addQuestion() {
    questionCount++; // Incrementa el contador para la nueva pregunta

    // Crear un nuevo contenedor de pregunta
    const newQuestion = document.createElement('div');
    newQuestion.classList.add('question-container');
    newQuestion.setAttribute('onclick', 'showActions(this)'); // Añadir evento para mostrar acciones
    newQuestion.innerHTML = `
        <input type="text" placeholder="Pregunta sin título" contenteditable="true">
        <div class="options" id="options-container-${questionCount}">
            <div class="option-label">
                <input type="radio" name="option-${questionCount}">
                <input type="text" class="option-text" value="Opción 1" onfocus="showBorder(this)" onblur="hideBorder(this)">
                <span class="remove-option" onclick="removeOption(this)">✖</span>
            </div>
        </div>
        <!-- Línea separadora -->
        <hr class="separator">
        <div class="add-option" style="display:none;" onclick="addOption(${questionCount})">Agregar opción</div>
        <!-- Botón para eliminar la pregunta -->
        <button class="remove-question" style="display:none;" onclick="removeQuestion(this)">🗑️</button>
    `;

    // Agregar la nueva pregunta al contenedor de preguntas
    document.getElementById('questions-container').appendChild(newQuestion);
}

 function showActions(questionContainer) {
    const questions = document.querySelectorAll('.question-container');
    // Ocultar acciones de todas las preguntas
    questions.forEach(q => {
        const addOptionButton = q.querySelector('.add-option');
        const removeQuestionButton = q.querySelector('.remove-question');
        const separator = q.querySelector('.separator');
        const removeOptions = q.querySelectorAll('.remove-option');

        addOptionButton.style.display = 'none';
        removeQuestionButton.style.display = 'none';
        separator.style.display = 'none'; // Ocultar línea separadora
        removeOptions.forEach(option => option.style.display = 'none'); // Ocultar botones de eliminar opción
    });

    // Mostrar acciones solo en la pregunta seleccionada
    const addOptionButton = questionContainer.querySelector('.add-option');
    const removeQuestionButton = questionContainer.querySelector('.remove-question');
    const separator = questionContainer.querySelector('.separator');
    const removeOptions = questionContainer.querySelectorAll('.remove-option');

    addOptionButton.style.display = 'block'; // Mostrar botón agregar opción
    removeQuestionButton.style.display = 'block'; // Mostrar botón eliminar pregunta
    separator.style.display = 'block'; // Mostrar línea separadora
    removeOptions.forEach(option => option.style.display = 'block'); // Mostrar botones de eliminar opción
}

 function addOption(questionNumber) {
    optionCount++; // Incrementar el contador de opciones

    const optionsContainer = document.getElementById(`options-container-${questionNumber}`);
    const newOption = document.createElement('div');
    newOption.classList.add('option-label');
    newOption.innerHTML = `
        <input type="radio" name="option-${questionNumber}">
        <input type="text" class="option-text" value="Opción ${optionCount}" onfocus="showBorder(this)" onblur="hideBorder(this)">
        <span class="remove-option" onclick="removeOption(this)">✖</span>
    `;

    // Añadir la nueva opción al contenedor de opciones
    optionsContainer.appendChild(newOption);
}

 function removeOption(option) {
    const optionLabel = option.closest('.option-label');
    optionLabel.remove();
}

 function removeQuestion(button) {
    const questionContainer = button.closest('.question-container');
    questionContainer.remove();
}

 function showBorder(input) {
    input.style.borderBottom = '2px solid #673AB7';
}

 function hideBorder(input) {
    input.style.borderBottom = '2px solid transparent';
}

// Importar Firebase y Realtime Database
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDnLogrE97_pMkoX61w_uNSM6MwDMGN_I8",
    authDomain: "generadorex-6ab43.firebaseapp.com",
    databaseURL: "https://generadorex-6ab43-default-rtdb.firebaseio.com",
    projectId: "generadorex-6ab43",
    storageBucket: "generadorex-6ab43.firebasestorage.app",
    messagingSenderId: "655158666019",
    appId: "1:655158666019:web:3d3edab6b7d4aec4e02296"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Función para generar un código alfanumérico de 6 caracteres
function generateCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

window.saveToFirebase = function () {
    // Verificar si el usuario está autenticado y obtener su correo electrónico
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const docenteEmail = user.email; // Correo del docente autenticado
            const questions = document.querySelectorAll('.question-container');
            const questionData = [];
            let isValid = true;

            questions.forEach((question) => {
                const questionText = question.querySelector('input[type="text"]').value.trim();
                const options = Array.from(question.querySelectorAll('.option-label')).map(option => {
                    return {
                        text: option.querySelector('.option-text').value.trim(),
                        correct: option.querySelector('input[type="radio"]').checked
                    };
                });

                const hasCorrectOption = options.some(option => option.correct);
                if (questionText === "" || options.length < 2 || options.some(option => option.text === "") || !hasCorrectOption) {
                    isValid = false;
                } else {
                    questionData.push({
                        questionText,
                        options
                    });
                }
            });

            if (!isValid) {
                alert("Por favor, asegúrate de que todas las preguntas tengan al menos 2 opciones, que no haya campos vacíos y que haya al menos una opción correcta seleccionada.");
                return;
            }

            const title = document.querySelector('.header h1').innerText || "Formulario sin título";
            const description = document.querySelector('.header p').innerText || "Descripción del formulario";
            const code = generateCode();
            document.getElementById('code-display').innerText = `Código generado: ${code}`;

            const formData = {
                title,
                description,
                code,
                creatorEmail: docenteEmail,
                questions: questionData,
                responses: {}
            };

            // Reemplazamos los caracteres especiales en el correo para usarlo como clave en Firebase
            const sanitizedEmail = docenteEmail.replace(/[.#$[\]]/g, '_');
            const formsRef = ref(database, 'forms/' + sanitizedEmail + '/' + code);
            set(formsRef, formData)
                .then(() => {
                    console.log("Datos guardados en Firebase");
                    resetForm();
                })
                .catch(error => {
                    console.error("Error al guardar en Firebase:", error);
                });
        } else {
            alert("No has iniciado sesión.");
        }
    });
};

function resetForm() {
    document.querySelector('.header h1').innerText = "Formulario sin título"; // Resetear título
    document.querySelector('.header p').innerText = "Descripción del formulario"; // Resetear descripción
    const questionsContainer = document.getElementById('questions-container');

    // Limpiar preguntas
    while (questionsContainer.firstChild) {
        questionsContainer.removeChild(questionsContainer.firstChild); // Eliminar preguntas existentes
    }

    // Agregar una pregunta inicial
    addQuestion();
}

// Función para marcar la respuesta correcta
window.setCorrectAnswer = function (radio) {
    const options = radio.closest('.options').querySelectorAll('input[type="radio"]');
    options.forEach(option => {
        option.checked = false; // Desmarcar todos
    });
    radio.checked = true; // Marcar el actual
};


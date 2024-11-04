import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


// Función para cargar los formularios del docente autenticado
export function loadForms(docenteEmail) {
    const sanitizedEmail = docenteEmail.replace(/[.#$[\]]/g, '_');
    const formsRef = ref(database, 'forms/' + sanitizedEmail);

    get(formsRef)
        .then(snapshot => {
            const formList = document.getElementById('formList');
            formList.innerHTML = ""; // Limpiamos la lista antes de cargar los formularios

            if (snapshot.exists()) {
                snapshot.forEach(childSnapshot => {
                    const form = childSnapshot.val();
                    console.log(form); // Verificar el contenido de cada formulario
                    const listItem = document.createElement('li');
                    listItem.innerText = `${form.title}`;

                    // Agregar evento de clic para mostrar detalles del formulario
                    listItem.addEventListener('click', () => {
                        displayFormDetails(form); // Llamar a la función para mostrar detalles
                    });
 
                    formList.appendChild(listItem);
                });
            } else {
                alert("No se encontraron formularios para este docente.");
            }
        })
        .catch(error => {
            console.error("Error al cargar los formularios:", error);
        });
}




// Función para mostrar detalles del formulario
export function displayFormDetails(form) {
    const formDetails = document.getElementById('formDetails');
    const formContent = document.getElementById('formContent');
    
    // Mostrar el div de detalles
    formDetails.style.display = 'block'; // Asegúrate de que el contenedor esté visible

    formContent.innerHTML = `
        <h2>${form.title}</h2>
        <h2>${form.code}</h2>
        <p>${form.description}</p>
        <h3>Preguntas:</h3>
        <ul>
            ${form.questions.map(question => `
                <li>
                    <strong>${question.questionText}</strong>
                    <ul>
                        ${question.options.map(option => `
                            <li>${option.text} ${option.correct ? '(Correcto)' : ''}</li>
                        `).join('')}
                    </ul>
                </li>
            `).join('')}
        </ul>
    `;
}













// Agrega una función de inicialización si necesitas realizar algún setup al cargar
export function initializeViewForms() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const docenteEmail = user.email;
            console.log(`Docente autenticado: ${docenteEmail}`); // Verificar el email
            loadForms(docenteEmail);
        } else {
            
        }
    });
}



// Importar Firebase (Configura tus credenciales de tu proyecto Firebase Console)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// TODO: Reemplaza con la configuración de tu proyecto en Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "tu-id",
    appId: "tu-id"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Elementos de la interfaz
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.querySelector('.close-modal');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const userProfile = document.getElementById('userProfile');
const userName = document.getElementById('userName');

// Manejo del Modal
loginBtn.addEventListener('click', () => loginModal.classList.remove('hidden'));
closeModal.addEventListener('click', () => loginModal.classList.add('hidden'));

// Autenticación con Google Firebase
googleLoginBtn.addEventListener('click', async () => {
    try {
        await signInWithPopup(auth, provider);
        loginModal.classList.add('hidden');
    } catch (error) {
        console.error("Error en autenticación:", error);
    }
});

logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
});

// Observador de Estado de Sesión
onAuthStateChanged(auth, (user) => {
    if (user) {
        loginBtn.classList.add('hidden');
        userProfile.classList.remove('hidden');
        userName.textContent = user.displayName;
    } else {
        loginBtn.classList.remove('hidden');
        userProfile.classList.add('hidden');
    }
});

// Inicializar Gráfica del Observatorio (Chart.js)
const ctx = document.getElementById('aiAdoptionChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Manufactura', 'Banca y Fintech', 'Salud', 'Educación Superior', 'Comercio'],
        datasets: [{
            label: '% Adopción de IA en Entornos Laborales',
            data: [65, 88, 54, 72, 80],
            backgroundColor: '#00F2FE',
            borderRadius: 6
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { labels: { color: '#F3F4F6' } }
        },
        scales: {
            y: { ticks: { color: '#9CA3AF' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            x: { ticks: { color: '#9CA3AF' }, grid: { display: false } }
        }
    }
});

// Manejo del formulario de contacto
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Postulación enviada con éxito al Semillero ODIN!');
    e.target.reset();
});
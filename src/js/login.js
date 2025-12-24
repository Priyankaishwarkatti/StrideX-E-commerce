import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBTPXyWn4gYTc7_6GO4dx4AkZ03FtVU7L0",
    authDomain: "signup-form-bb6ec.firebaseapp.com",
    projectId: "signup-form-bb6ec",
    storageBucket: "signup-form-bb6ec.firebasestorage.app",
    messagingSenderId: "901625960222",
    appId: "1:901625960222:web:17e254fcd0aa8440d11b0f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider()

const loginBtn = document.getElementById('loginBtn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const googleLogin = document.getElementById("googleLogin")

function showMessage(message, divId) {
    let messageDiv = document.getElementById(divId)
    messageDiv.classList.add('block')
    messageDiv.classList.remove('hidden')
    messageDiv.innerHTML = message
    messageDiv.classList.add('opacity-1')
    messageDiv.classList.remove('opacity-0')
    setTimeout(function () {
        messageDiv.classList.add('opacity-0')
        messageDiv.classList.remove('opacity-1')
    }, 5000)
}

// google Authentication
googleLogin.addEventListener('click', function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log(user);
            window.location.href = "index.html"

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

        });
})


const signIn = document.getElementById('loginBtn')
signIn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

     if (!email || !password) {
    showMessage('Please fill all fields', 'loginMessage');
    return;
  }

    const auth = getAuth()

    signInWithEmailAndPassword(auth, email, password) 
    .then((userCredentials) => {
        showMessage('Login Successfully!!!', 'loginMessage')
        const user = userCredentials.user
        localStorage.setItem('loggedInUserId', user.uid)
        window.location.href = 'index.html'
    })  
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential'){
            showMessage('Incorrect Email or Password!!!', 'loginMessage')
        } else {
            showMessage('Account does not Exist!!!', 'loginMessage')
        }
    })

})


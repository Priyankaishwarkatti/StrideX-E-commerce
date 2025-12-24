import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyBTPXyWn4gYTc7_6GO4dx4AkZ03FtVU7L0",
    authDomain: "signup-form-bb6ec.firebaseapp.com",
    projectId: "signup-form-bb6ec",
    storageBucket: "signup-form-bb6ec.firebasestorage.app",
    messagingSenderId: "901625960222",
    appId: "1:901625960222:web:17e254fcd0aa8440d11b0f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const user = auth.currentUser;

const provider = new GoogleAuthProvider()

const registerEmailInput = document.getElementById('remail');
const registerPasswordInput = document.getElementById('rpassword');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const googleSignup = document.getElementById("googleSignup")
const form = document.getElementById('signupForm');


//register Email live validation
registerEmailInput.addEventListener('input', () => {
    if (registerEmailInput.value === '' || registerEmailInput.checkValidity()) {
        emailError.classList.add('hidden');
        registerEmailInput.classList.remove('border-red-600');
        registerEmailInput.classList.add('border-black');
    } else {
        emailError.classList.remove('hidden');
        registerEmailInput.classList.remove('border-black');
        registerEmailInput.classList.add('border-red-600');
    }
});

//register Password live validation
registerPasswordInput.addEventListener('input', () => {
    if (registerPasswordInput.value === '' || registerPasswordInput.checkValidity()) {
        passwordError.classList.add('hidden');
        registerPasswordInput.classList.remove('border-red-600');
        registerPasswordInput.classList.add('border-black');
    } else {
        passwordError.classList.remove('hidden');
        registerPasswordInput.classList.remove('border-black');
        registerPasswordInput.classList.add('border-red-600');
    }
});

// google Authentication
console.dir(googleSignup)
googleSignup.addEventListener('click', function() {
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

function updateUserProfile(user){
    const userName = user.displayName
    console.log(userName);

    document.getElementById('loggedUserFName').textContent = userName
}

onAuthStateChanged(auth, (user) => {
    if(user) {
        updateUserProfile(user)
        const uid = user.uid
        return uid

    } else {
        showMessage("Create Account and Login!!!", 'signupMessage')
        window.location.href = 'index.html'
    }
})


function showMessage(message, divId){
    let messageDiv = document.getElementById(divId)
    messageDiv.classList.add('block')
    messageDiv.classList.remove('hidden')
    messageDiv.innerHTML = message
    messageDiv.classList.add('opacity-1')
    messageDiv.classList.remove('opacity-0')
    setTimeout(function(){
        messageDiv.classList.add('opacity-0')
        messageDiv.classList.remove('opacity-1')
    },5000)
}



// Submit validation
form.addEventListener('click', (e) => {
    e.preventDefault();

    const userEmail = document.getElementById('remail').value
    const userPassword = document.getElementById('rpassword').value
    const firstName = document.getElementById('fname').value
    const lastName = document.getElementById('lname').value

    const auth = getAuth()
    const db = getFirestore()

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredentials)=>{
        const user = userCredentials.user
        const userData = {
            email: userEmail,
            firstName: firstName,
            lastName: lastName
        }
        showMessage('Account Created Successfully!', 'signupMessage')
        const docRef = doc(db, 'users', user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href = 'login.html'
        })
        .catch((error) => {
            console.log('error writing document', error);
        });
    })
    .catch((error) =>{
            const errorCode = error.code;
            if(errorCode == 'auth/email-already-in-use'){
                showMessage('Email Already Exists!!!', 'signupMessage')
            } else {
                showMessage('Unable to Create User!!!', 'signupMessage')
            }
        })
});





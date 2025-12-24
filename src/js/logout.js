import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyBTPXyWn4gYTc7_6GO4dx4AkZ03FtVU7L0",
    authDomain: "signup-form-bb6ec.firebaseapp.com",
    projectId: "signup-form-bb6ec",
    storageBucket: "signup-form-bb6ec.firebasestorage.app",
    messagingSenderId: "901625960222",
    appId: "1:901625960222:web:17e254fcd0aa8440d11b0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()
const db = getFirestore()

// const hiMessage = document.getElementById('hiMessage')
const hiUserProfile = document.getElementById('hiUserProfile')
const userLoginTag = document.getElementById('userLoginTag')

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId')
    if(loggedInUserId){
        const docRef = doc(db, 'users', loggedInUserId)
        getDoc(docRef)
        .then((docSnap) => {
            if(docSnap.exists()){
                const userData = docSnap.data();
                document.getElementById('loggedUserFName').innerText = userData.firstName;
                // hiMessage.classList.remove('hidden')
                hiUserProfile.classList.remove('hidden')
                userLoginTag.classList.add('hidden')
            } else {
                console.log("No Document Found matching Id");
            }
        })
        .catch((error) => {
            console.log('Error getting Document');
        })
    } else {
        console.log('User Id not found in Local Storage');
    }
})


const logoutButton = document.getElementById('logoutBtn')

logoutButton.addEventListener('click', () =>{
    localStorage.removeItem('loggedInUserId')
    signOut(auth)
    .then(() => {
        window.location.href = '../pages/index.html'
        // hiMessage.classList.add('hidden')
        hiUserProfile.classList.add('hidden')
        userLoginTag.classList.remove('hidden')
    })
    .catch((error) => {
        console.log("Error Signed Out:", error);
    })
})

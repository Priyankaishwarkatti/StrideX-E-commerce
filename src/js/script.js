const openMenu = document.querySelector('#open-menu');
const closeMenu = document.querySelector('#close-menu');
const overlay = document.querySelector('#overlay');
const navBar = document.querySelector('#nav-bar');

// OPEN menu
openMenu.addEventListener('click', () => {
    overlay.classList.remove("hidden");
    navBar.classList.remove("translate-x-full");
});

// // CLOSE menu
closeMenu.addEventListener('click', () => {
    overlay.classList.add("hidden");
     if (window.innerWidth < 768) { 
    navBar.classList.add("translate-x-full");
     }
});
 

// // CLOSE when clicking overlay
overlay.addEventListener('click', () => {
    overlay.classList.add("hidden");
     if (window.innerWidth < 768) { 
    navBar.classList.add("translate-x-full");
     }
});
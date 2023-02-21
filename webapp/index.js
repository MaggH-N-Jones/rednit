let loginButton = document.getElementById("loginButton");
let signupButton = document.getElementById("signupButton");

/**
 * 
 * @param {string} pagePath 
 */

function redirectToPage(pagePath) {
    window.location.pathname = pagePath
}

loginButton.addEventListener("click", () => {
    redirectToPage("/login.html")

});

let click = "click"
let alfred = () => { redirectToPage("/register.html") }

signupButton.addEventListener(click, alfred);
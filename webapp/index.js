let loginButton = document.getElementById("login-button");
let signupButton = document.getElementById("signup-button");

function redirectToPage(pagePath) {
    window.location.pathname = pagePath
}

loginButton.addEventListener("click", () => {
    redirectToPage("/login.html")

});

let click = "click"
let alfred = () => { redirectToPage("/register.html") }

signupButton.addEventListener(click, alfred);
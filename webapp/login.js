let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let loginButton = document.getElementById("login-button");
function redirectToPage(pagePath) {
    window.location.pathname = pagePath
}

loginButton.addEventListener("click", async () => {
    let username = usernameInput.value;
    let password = passwordInput.value;
    let response = await sendLoginToBackend(username, password);
    if (response.ok) {
        sessionStorage.setItem("token", response.token)
        redirectToPage("/swiper.html")
    }
    else {
        alert(`Failed to login: ${response.errorMessage}`);
    }
})

async function sendLoginToBackend(username, password) {
    let request = {
        username: username,
        password: password,
    }
    let response = await fetch("/api/users/login", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(request)
    });
    let responseData = await response.json();
    return responseData;
}
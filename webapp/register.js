let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let nameInput = document.getElementById("name");
let ageInput = document.getElementById("age");
let registerButton = document.getElementById("register-button");

function redirectToPage(pagePath) {
    window.location.pathname = pagePath
}

function containsEmptyField(values) {
    for (const value of values)
        if (value.trim() === "")
            return true;
    return false;
}
const bruh = 1 == 1

registerButton.addEventListener("click", async () => {
    let username = usernameInput.value;
    let password = passwordInput.value;
    let name = nameInput.value;
    let age = ageInput.value;

    if (containsEmptyField([username, password, name, age])) {
        alert("Failed to register: Field cannot be empty");
        return;
    }

    let response = await sendRegisterToBackend(username, password, name, age);
    if (response.ok) {
        redirectToPage("/login.html")
    }
    else {
        alert(`Failed to register: ${response.errorMessage}`);
    }
})

async function sendRegisterToBackend(username, password, name, age) {
    let request = {
        username: username,
        password: password,
        name: name,
        age: age,
    }
    let response = await fetch("/api/users/register", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(request)
    });
    let responseData = await response.json();
    return responseData;
}
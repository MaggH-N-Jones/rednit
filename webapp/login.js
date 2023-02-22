let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let loginCommitButton = document.getElementById("login-commit-button");





loginCommitButton.addEventListener("click", () => {
    console.log(usernameInput.value);
})
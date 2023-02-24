let matchButton = document.getElementById("match-button");
let passButton = document.getElementById("pass-button");

matchButton.addEventListener("click", async () => {
    console.log("yes")
    let response = await fetchNewCandidateFromBackend(token);
    if (response.ok) { }
})

passButton.addEventListener("click", async () => {
    console.log("no")
    let response = await fetchNewCandidateFromBackend(token);
    if (response.ok) { }
})

async function fetchNewCandidateFromBackend(token) {
    let response = await fetch(`/api/users/request?token=${token}`, {
         
        
    });
}
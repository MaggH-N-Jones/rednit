let matchButton = document.getElementById("match-button");
let passButton = document.getElementById("pass-button");
let candidateDiv = document.getElementById("candidate");

function redirectToPage(pagePath) {
    window.location.pathname = pagePath
}

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
    let response = await fetch(`/api/swiper/candidate?token=${token}`,);
    let responseData = await response.json();
    return responseData;
}

async function onPageLoaded() {
    const token = sessionStorage.getItem("token")
    if(token === null){
        redirectToPage("/login.html")
    }
    const response = await fetchNewCandidateFromBackend(token)
    
    if(!response.ok){
        throw new Error("Could not fetch candidate")
    }
    candidateDiv.innerHTML = candidateToHtml(response.candidate)
}
onPageLoaded()

function candidateToHtml(candidate) {

    return /* html */`
        <img src="${candidate.picture}"
            alt="alternatetext">
        <div class="candidate-info">
            <span class="name">${candidate.name}</span>
            <span class="age">${candidate.age}</span>
        </div>
    `
}
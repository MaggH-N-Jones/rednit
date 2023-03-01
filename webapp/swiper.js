let matchButton = document.getElementById("match-button");
let passButton = document.getElementById("pass-button");
let candidateDiv = document.getElementById("candidate");

function redirectToPage(pagePath) {
    window.location.pathname = pagePath
}

async function fetchNewCandidateFromBackend(token) {
    let response = await fetch(`/api/swiper/candidate?token=${token}`,);
    let responseData = await response.json();
    return responseData;
}

function checkLogin() {
    const token = sessionStorage.getItem("token")
    if (token === null)
        redirectToPage("/login.html")
    return token;
}

async function loadNewCandidate(context) {
    const response = await fetchNewCandidateFromBackend(context.token)

    if (!response.ok) {
        if (response.errorMessage === "Unauthorized")
            redirectToPage("/login.html")
        throw new Error("Could not fetch candidate")
    }
    context.candidate = response.candidate
    candidateDiv.innerHTML = candidateToHtml(context.candidate)
}

async function sendUserMatchToBackend(token, swiped) {
    const request = {
        token: token,
        swiped: swiped,
    }
    const response = await fetch("/api/swiper/match", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(request),
    })
    const responseData = await response.json();
    return responseData;
}

function addEventListeners(context) {
    matchButton.addEventListener("click", async () => {
        const matchResponse = await sendUserMatchToBackend(context.token, context.candidate.id);
        if (!matchResponse.ok)
            throw new Error("Could not send match request")
        loadNewCandidate(context)
    })

    passButton.addEventListener("click", async () => {
        loadNewCandidate(context)
    })
}

async function onPageLoaded() {
    const token = checkLogin();
    if (!token)
        throw new Error('Invalid token')
    const context = {
        candidate: null,
        token: token,
    }
    addEventListeners(context)
    loadNewCandidate(context)
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
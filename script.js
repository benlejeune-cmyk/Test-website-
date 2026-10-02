const escapeButton = document.getElementById("escape");
const homeCard = document.querySelector("#home .card");


// =========================
// HARTJES REGEN
// =========================

function heartRain() {

    for (let i = 0; i < 30; i++) {

        const heart = document.createElement("div");

        heart.textContent = "❤️";

        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "-50px";
        heart.style.fontSize = (15 + Math.random() * 25) + "px";
        heart.style.zIndex = "99999";
        heart.style.pointerEvents = "none";

        const duration = 2 + Math.random() * 2;
        const delay = Math.random() * 0.8;

        heart.style.animation =
            `heartFall ${duration}s linear ${delay}s forwards`;

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, (duration + delay) * 1000 + 100);
    }
}


// CSS voor de hartjes
const heartStyle = document.createElement("style");

heartStyle.textContent = `
@keyframes heartFall {

    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }

    100% {
        transform: translateY(110vh) rotate(360deg);
        opacity: 0;
    }

}
`;

document.head.appendChild(heartStyle);


// =========================
// ELKE KNOP → HARTJES
// =========================

document.addEventListener("click", function(event) {

    const button = event.target.closest("button");

    if (button) {
        heartRain();
    }

});


// =========================
// WEGVLUCHTENDE NEEN-KNOP
// =========================

if (escapeButton && homeCard) {

    escapeButton.addEventListener("mouseenter", function () {

        const maxX = Math.max(
            0,
            homeCard.clientWidth -
            escapeButton.offsetWidth -
            20
        );

        const maxY = Math.max(
            0,
            homeCard.clientHeight -
            escapeButton.offsetHeight -
            20
        );

        escapeButton.style.position = "absolute";

        escapeButton.style.left =
            `${Math.random() * maxX}px`;

        escapeButton.style.top =
            `${Math.random() * maxY}px`;

    });

    escapeButton.addEventListener("click", function () {

        escapeButton.textContent = "Bijna!";

    });

}


// =========================
// JA-KNOP
// =========================

const yesButton = document.getElementById("yes");

if (yesButton) {

    yesButton.addEventListener("click", function () {

        setTimeout(function () {
            window.location.href = "ja.html";
        }, 1000);

    });

}


// =========================
// ECHT NEE-KNOP
// =========================

const noButton = document.getElementById("no");

if (noButton) {

    noButton.addEventListener("click", function () {

        const zeker = confirm("Ben je heel zeker?");

        if (zeker) {

            window.location.href = "neen.html";

        } else {

            window.location.href = "index.html";

        }

    });

}


// =========================
// AGENDA
// =========================

const agendaForm = document.getElementById("agendaForm");

if (agendaForm) {

    agendaForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const gekozenDatum =
            document.getElementById("agendaDate").value;

        const gekozenUur =
            document.getElementById("agendaTime").value;

        localStorage.setItem(
            "gekozenDatum",
            gekozenDatum
        );

        localStorage.setItem(
            "gekozenUur",
            gekozenUur
        );

        window.location.href = "keuze.html";

    });

}


// =========================
// ACTIVITEITEN
// =========================

const keuzeForm = document.getElementById("keuzeForm");

if (keuzeForm) {

    keuzeForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const gekozenActiviteiten = [];

        const checkboxes = document.querySelectorAll(
            'input[name="activiteit"]:checked'
        );

        checkboxes.forEach(function (checkbox) {

            gekozenActiviteiten.push(
                checkbox.value
            );

        });

        const eigenIdeeInput =
            document.getElementById("eigenIdee");

        const eigenIdee =
            eigenIdeeInput
                ? eigenIdeeInput.value.trim()
                : "";

        localStorage.setItem(
            "gekozenActiviteiten",
            JSON.stringify(gekozenActiviteiten)
        );

        localStorage.setItem(
            "eigenIdee",
            eigenIdee
        );

        window.location.href = "result.html";

    });

}
/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    AKAI Frontend Task - Javascript

    W tym zadaniu postaraj się zaimplementować metody, które sprawdzą, czy dane wprowadzone
    do formularza są poprawne. Przykładowo: czy imię i nazwisko zostało wprowadzone.
    Możesz rozwinąć walidację danych tak bardzo, jak tylko zapragniesz.

    Powodzenia!
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

const form = document.getElementsByTagName("form")[0];

document.querySelector("input[type=submit]").addEventListener("click", (event) => {
    event.preventDefault();
    let invalids = Array.from(document.querySelectorAll("input:invalid"));
    if (!invalids.length) {
        form.submit();
        return;
    }
    invalids.forEach((elem) => elem.classList.add("invalid"));
    setTimeout(() => invalids.forEach((elem) => elem.classList.remove("invalid")), 400);
});

const
    fnameInput = document.getElementById("firstName"),
    lnameInput = document.getElementById("lastName"),
    emailInput = document.getElementById("email");

/*fnameInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        lnameInput.focus();
    }
});

lnameInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        emailInput.focus();
    }
});*/
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

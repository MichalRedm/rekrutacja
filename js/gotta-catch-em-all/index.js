"use strict";
const form = document.querySelector("form");
const allPokemonsContainer = document.querySelector(".pokemons");
const pokemonNameInput = document.getElementById("pokemonName");
const formFiltersTypesConatiner = document.getElementById("formFiltersTypes");
const formFiltersTypes = Array.from(formFiltersTypesConatiner.querySelectorAll("input"));
function submitForm(event) {
    event.preventDefault();
    const filters = {
        types: getTypesFilters(),
        name: pokemonNameInput.value
    };
    Pokemon.filter(filters);
    if (allPokemonsContainer.offsetHeight) {
        allPokemonsContainer.classList.remove("no-pokemons");
    }
    else {
        allPokemonsContainer.classList.add("no-pokemons");
    }
}
form.addEventListener("submit", submitForm);
function getTypesFilters() {
    const types = [];
    formFiltersTypes.forEach(element => {
        if (element.checked) {
            types.push(element.id);
        }
    });
    return types;
}
class Pokemon {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.types = data.types;
        this.image = data.image;
        this.card = this.generateCard();
        Pokemon.list.push(this);
    }
    generateCard() {
        const pokemonContainer = document.createElement("article");
        pokemonContainer.classList.add("pokemon");
        const image = document.createElement("img");
        image.classList.add("pokemon__image");
        image.setAttribute("src", this.image);
        image.setAttribute("alt", `Image of the ${this.name}`);
        pokemonContainer.appendChild(image);
        const info = document.createElement("div");
        const name = document.createElement("h1");
        name.innerText = this.name;
        info.appendChild(name);
        const types = document.createElement("p");
        types.classList.add("pokemon__types");
        this.types.forEach(type => {
            const typeContainer = document.createElement("div");
            typeContainer.innerText = type;
            types.appendChild(typeContainer);
        });
        info.append(types);
        pokemonContainer.appendChild(info);
        allPokemonsContainer.appendChild(pokemonContainer);
        return pokemonContainer;
    }
    set display(value) {
        this.card.style.display = value ? "flex" : "none";
    }
    static renderPokemons(pokemonsData) {
        pokemonsData.forEach(pokemonData => new Pokemon(pokemonData));
    }
    static filter(filterObject) {
        Pokemon.list.forEach(pokemon => pokemon.display = pokemon.types.some(element => filterObject.types.includes(element)) && pokemon.name.toLowerCase().includes(filterObject.name.toLowerCase()));
    }
}
Pokemon.list = [];
Pokemon.renderPokemons(pokemons);

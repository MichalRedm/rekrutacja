"use strict";
const allPokemonsContainer = document.querySelector(".pokemons");
const pokemonNameInput = document.getElementById("pokemon-name");
const formFiltersTypesConatiner = document.getElementById("formFiltersTypes");
const formFiltersTypes = Array.from(formFiltersTypesConatiner.querySelectorAll("input"));
const form = document.querySelector("form");
function submitForm(event) {
    event.preventDefault();
    const filters = {
        types: getTypesFilters(),
        name: pokemonNameInput.value
    };
    Pokemon.filter(filters);
}
function getTypesFilters() {
    const types = [];
    formFiltersTypes.forEach(element => {
        if (element.checked) {
            types.push(element.id);
        }
    });
    return types;
}
form.addEventListener("submit", submitForm);
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
        info.classList.add("pokemon__info");
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
    get display() {
        return this.card.style.display == "flex";
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

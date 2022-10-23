/** Used to filter the pokemons by name and types. */
interface FilterObject {
    name: string;
    types: string[];
}


const form                      = <HTMLFormElement>  document.querySelector("form");
const allPokemonsContainer      = <HTMLDivElement>   document.querySelector(".pokemons");
const pokemonNameInput          = <HTMLInputElement> document.getElementById("pokemon-name");
const formFiltersTypesConatiner = <HTMLDivElement>   document.getElementById("formFiltersTypes");

const formFiltersTypes: HTMLInputElement[] = Array.from(formFiltersTypesConatiner.querySelectorAll("input"));


/**
 * Executed when the `.form` element is submitted.
 * 
 * @param event Form submit event.
 */
function submitForm(event: Event): void {

    event.preventDefault();

    const filters: FilterObject = {
        types: getTypesFilters(),
        name: pokemonNameInput.value
    }

    Pokemon.filter(filters);

}

form.addEventListener("submit", submitForm);


/**
 * Gets the types filter.
 * 
 * @returns List of the types selected by user.
 */
function getTypesFilters(): string[] {

    const types: string[] = [];

    formFiltersTypes.forEach(element => {
        if (element.checked) {
            types.push(element.id)
        }
    });

    return types;
}


class Pokemon implements PokemonData {

    readonly id: number;
    readonly name: string;
    readonly types: string[];
    readonly image: string;
    /** A DOM element displaying basic info about the pokemon. */
    readonly card: HTMLElement;
    /** List of all the instances of the `Pokemon` class. */
    private static readonly list: Pokemon[] = [];

    constructor(data: PokemonData) {
        this.id = data.id;
        this.name = data.name;
        this.types = data.types;
        this.image = data.image;
        this.card = this.generateCard();
        Pokemon.list.push(this);
    }

    /**
     * Generates a card that will be stored as `this.card`.
     * 
     * @returns Card element.
     */
    private generateCard(): HTMLElement {
    
        const pokemonContainer: HTMLElement = document.createElement("article");
        pokemonContainer.classList.add("pokemon");

        const image: HTMLImageElement = document.createElement("img");
        image.classList.add("pokemon__image");
        image.setAttribute("src", this.image);
        image.setAttribute("alt", `Image of the ${this.name}`);
        pokemonContainer.appendChild(image);

        const info: HTMLDivElement = document.createElement("div");
        info.classList.add("pokemon__info");

        const name: HTMLHeadingElement = document.createElement("h1");
        name.innerText = this.name;
        info.appendChild(name);

        const types: HTMLParagraphElement = document.createElement("p");
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

    /** `true` if the pokemon is displayed on the list, `false` otherwise. */
    set display(value: boolean) {
        this.card.style.display = value ? "flex": "none";
    }

    /**
     * Renders the list of all pokemons.
     * 
     * @param pokemonsData List containing raw data about each pokemon.
     */
    static renderPokemons(pokemonsData: PokemonData[]): void {
        pokemonsData.forEach(pokemonData => new Pokemon(pokemonData));
    }

    /**
     * Filters all the pokemons by a given filter.
     * 
     * @param filterObject Filter to use when filtering pokemons.
     */
    static filter(filterObject: FilterObject): void {
        Pokemon.list.forEach(pokemon => pokemon.display = pokemon.types.some(element => filterObject.types.includes(element)) && pokemon.name.toLowerCase().includes(filterObject.name.toLowerCase()));
    }

}


Pokemon.renderPokemons(pokemons);

const pokemonList = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const $ = (el) => document.getElementById(el);
const $searchInput = $("search-input");
const $searchBtn = $("search-button");
const $name = $("pokemon-name");
const $id = $("pokemon-id");
const $weight = $("weight");
const $height = $("height");
const $types = $("types");
const $hp = $("hp");
const $attack = $("attack");
const $defense = $("defense");
const $speciaAttack = $("special-attack");
const $specialDefense = $("special-defense");
const $speed = $("speed");

let pokemonData = [];

const fetchData = async () => {
  try {
    const res = await fetch(pokemonList);
    const data = await res.json();
    pokemonData = data.results;
    showPokemon(pokemonData);
  } catch (err) {
    console.log(err);
  }
};

fetchData();

const showPokemon = (data) => {
  console.log(data);
};

$searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const basicInfo = pokemonNameOrId();
  if (basicInfo) console.log(basicInfo.url);
  else alert("Pokémon not found");
  pokemonInfo(basicInfo);
  // Cuando buscas 1 o bulbasaur tiene que acceder a https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/1/
  // Del este último link se accede a cada atributo y se muestra en el textcontent de la id correspondiente
});

$searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const basicInfo = pokemonNameOrId();
    if (basicInfo) console.log(basicInfo.url);
    else alert("Pokémon not found");
    pokemonInfo(basicInfo);
  }
  // Cuando buscas 1 o bulbasaur tiene que acceder a https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/1/
  // Del este último link se accede a cada atributo y se muestra en el textcontent de la id correspondiente
});

const pokemonNameOrId = () => {
  if (isNaN($searchInput.value)) {
    return pokemonData.find(
      (pokemon) => pokemon.name === $searchInput.value.toLowerCase()
    );
  } else {
    return pokemonData.find(
      (pokemon) => pokemon.id === Number($searchInput.value)
    );
  }
};

const findPokemonById = (id) =>
  pokemonData.find((pokemon) =>
    pokemon.id.toString().includes($searchInput.value)
  );

const pokemonInfo = (obj) => {
  $name.textContent = obj.name.charAt(0).toUpperCase() + obj.name.slice(1);
  $id.textContent = obj.id;
  $weight.textContent = 0;
  $height.textContent = 0;
  $types.textContent = 0;
  $hp.textContent = 0;
  $attack.textContent = 0;
  $defense.textContent = 0;
  $speciaAttack.textContent = 0;
  $specialDefense.textContent = 0;
  $speed.textContent = 0;
};

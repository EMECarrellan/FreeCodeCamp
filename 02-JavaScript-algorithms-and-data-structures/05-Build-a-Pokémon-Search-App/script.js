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
const $img = $("pokemon-img")

let pokemonData = [];
let pokemonAttributes = [];

const fetchData = async () => {
  try {
    const res = await fetch(pokemonList)
    const data = await res.json()
    pokemonData = data.results
  } catch (err) {
    console.log(err)
  }
}

fetchData()

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

const pokemonInfo = (data) => {

    const typeColors = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD",
      };

  $weight.textContent = data.weight;
  $height.textContent = data.height;
  $types.innerHTML = "";
  $types.textContent = "";
  $types.textContent = $types.innerHTML = "";
  data.types.forEach(typeInfo => {
    const typeElement = document.createElement('span');
    typeElement.textContent = typeInfo.type.name.toUpperCase();
    typeElement.style.backgroundColor = typeColors[typeInfo.type.name] || "#ccc"
    typeElement.classList.add('py-1', 'p-3', 'rounded-full', 'mx-1', 'font-bold','text-white');
    $types.appendChild(typeElement);
  });
  $hp.textContent = data.stats.find(stat => stat.stat.name === "hp").base_stat;
  $attack.textContent = data.stats.find(stat => stat.stat.name === "attack").base_stat;
  $defense.textContent = data.stats.find(stat => stat.stat.name === "defense").base_stat;
  $speciaAttack.textContent = data.stats.find(stat => stat.stat.name === "special-attack").base_stat;
  $specialDefense.textContent = data.stats.find(stat => stat.stat.name === "special-defense").base_stat;
  $speed.textContent = data.stats.find(stat => stat.stat.name === "speed").base_stat;
  const mainContainer = document.createElement('div');
  mainContainer.classList.add("flex", "justify-center", "flex-col", "mt-4", "mb-2", "content-center", "p-6", "rounded-lg", "py-2");
  mainContainer.style.background = `radial-gradient(circle, rgba(255,255,255,0.3), ${typeColors[data.types[0].type.name] || "#ccc"})`;

  mainContainer.innerHTML = `
    <img id="sprite" src="${data.sprites.front_default}" class="hover:scale-125 hover:ease-in-out duration-500" alt="">
    <p>${$name.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1)} #${$id.textContent = data.id}</p>
    <div class="flex justify-center items-center mt-2">
        <p class="flex flex-row" id="types"></p>
    </div>
  `;

  $img.innerHTML = ""; // Limpia cualquier contenido previo
  $img.appendChild(mainContainer); // Agrega el nuevo contenedor al DOM
};

$searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const basicInfoList = pokemonNameOrId();
  if (basicInfoList) console.log(basicInfoList.url);
  else alert("Pokémon not found");
  const pokemonListAttributes = basicInfoList.url;
  const fetchAttributes = async () => {
      try {
          const res = await fetch(pokemonListAttributes);
          pokemonAttributes = await res.json();
        pokemonInfo(pokemonAttributes);
        } catch (err) {
            console.log(err);
        }
    };
    fetchAttributes();
});

$searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const basicInfoList = pokemonNameOrId();
    if (basicInfoList) console.log(basicInfoList.url);
    else alert("Pokémon not found");
    const pokemonListAttributes = basicInfoList.url;
    const fetchAttributes = async () => {
        try {
            const res = await fetch(pokemonListAttributes);
            pokemonAttributes = await res.json();
          pokemonInfo(pokemonAttributes);
          } catch (err) {
              console.log(err);
          }
      };
      fetchAttributes();
  }
});

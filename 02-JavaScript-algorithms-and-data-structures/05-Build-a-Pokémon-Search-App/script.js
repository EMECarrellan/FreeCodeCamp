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
  $name.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  $id.textContent = data.id;
  $weight.textContent = data.weight;
  $height.textContent = data.height;
  $types.innerHTML = "";
  $types.textContent = "";
  $types.textContent = $types.innerHTML = ""; // Limpia los tipos anteriores
  data.types.forEach(typeInfo => {
    const typeElement = document.createElement('div');
    typeElement.textContent = typeInfo.type.name.toUpperCase();
    $types.appendChild(typeElement);
  });
  $hp.textContent = data.stats.find(stat => stat.stat.name === "hp").base_stat;
  $attack.textContent = data.stats.find(stat => stat.stat.name === "attack").base_stat;
  $defense.textContent = data.stats.find(stat => stat.stat.name === "defense").base_stat;
  $speciaAttack.textContent = data.stats.find(stat => stat.stat.name === "special-attack").base_stat;
  $specialDefense.textContent = data.stats.find(stat => stat.stat.name === "special-defense").base_stat;
  $speed.textContent = data.stats.find(stat => stat.stat.name === "speed").base_stat;
  $img.innerHTML = ` <div>
                <img id="sprite" src="${data.sprites.front_default}" alt="">
            </div>`
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

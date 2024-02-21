const input = document.getElementById('search-input');
const search = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const id = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const pokemonType = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const image = document.getElementById('image');


//converting pokemon names that have specific genders (e.g. Nidoran♀) or full stops in their name (e.g. Mr. Mime) into recognised inputs
const validateInput = (input) => {
  input = input.toLowerCase();
  input = input.replace("♀","-f");
  input = input.replace("♂","-m");
  input = input.replace(". "||".","-");
  return input;
}

//fetching pokemon data
const pokemonInfo = async () => {
  try {
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${validateInput(input.value)}`);
    const data = await res.json();
    const { sprites, stats, types} = data;

    //Extracting relevant stat values from data
    let pokemonStats = stats.map((data) => {
      const {stat, base_stat} = data;
      return [stat.name, base_stat]
    })

    //Extracting pokemon types and formatting them correctly
    let pokemonTypes = types.map((data) => {
      const { type } = data;
      return type.name.toUpperCase()
    });
    
    //resetting pokemon type after each search 
    pokemonType.innerHTML="";

    //displaying pokemon data
    pokemonName.innerHTML = `${data.name.toUpperCase()}`;
    id.innerHTML = `#${data.id}`;
    image.innerHTML = `<img id="sprite" src = "${data.sprites.front_default}"/>`
    weight.innerHTML = `Weight: ${data.weight}`;
    height.innerHTML = `Height: ${data.height}`;
    hp.innerHTML = `${pokemonStats[0][1]}`;
    attack.innerHTML = `${pokemonStats[1][1]}`;
    defense.innerHTML = `${pokemonStats[2][1]}`;
    specialAttack.innerHTML = `${pokemonStats[3][1]}`;
    specialDefense.innerHTML = `${pokemonStats[4][1]}`;
    speed.innerHTML = `${pokemonStats[5][1]}`;
    for (let i=0; i<pokemonTypes.length; i++) {
      pokemonType.innerHTML += `<div></div><div></div><div></div><div></div><div></div><div class="${pokemonTypes[i]}">${pokemonTypes[i]}</div><div></div><div></div><div></div><div></div><div></div>`;
    }
    input.value="";
  } catch (err) {
    console.log(err)
    alert("Pokémon not found")
  }
  

}

//pressing enter key runs search
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    pokemonInfo();
  }
});

search.addEventListener("click", pokemonInfo);
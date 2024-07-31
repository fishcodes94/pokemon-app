///'https://pokeapi.co/api/v2/pokemon?limit=1000'

document.addEventListener("DOMContentLoaded", () => {
  const formArea = document.querySelector("#form-area");
  const userInput = document.querySelector("input");
  const pokeDexContainer = document.querySelector("#pokedex-container");
  const titleButton = document.querySelector("button");
  const suggestionBox = document.querySelector("#suggestions");

  titleButton.addEventListener("click", () => {
    pokeDexContainer.innerHTML = "";
    userInput.value = "";
    suggestionBox.innerHTML = "";
  });

  formArea.addEventListener("submit", (event) => {
    event.preventDefault();
    const userRequest = userInput.value.toLowerCase().trim("");
    suggestionBox.innerHTML = "";
    fetchAndDisplay(userRequest);
  });

  async function fetchAndDisplay(userRequest) {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1000"
      );
      const data = await response.json();
      const filteredPokemon = data.results.filter((pokemon) =>
        pokemon.name.includes(userRequest)
      );

      displayInfo(filteredPokemon);
    } catch (error) {
      console.error("Data in not working");
      pokeDexContainer.innerHTML = "Data is not working";
    }
  }

  async function displayInfo(pokemonList) {
    pokeDexContainer.innerHTML = "";

    for (let poke of pokemonList) {
      const pokemonResponse = await fetch(poke.url);
      const pokemonData = await pokemonResponse.json();

      const hp = pokemonData.stats.find(
        (stat) => stat.stat.name === "hp"
      ).base_stat;
      const attack = pokemonData.stats.find(
        (stat) => stat.stat.name === "attack"
      ).base_stat;
      const defense = pokemonData.stats.find(
        (stat) => stat.stat.name === "defense"
      ).base_stat;
      const speed = pokemonData.stats.find(
        (stat) => stat.stat.name === "speed"
      ).base_stat;

      const types = pokemonData.types
        .map((typeInfo) => typeInfo.type.name)
        .join(", ");

      const container = document.createElement("div");
      container.innerHTML = `

        <h2>${pokemonData.name}</h2>
        <div id="poke-type"> ${types}</div>
        
        <img id="imageEl" src="${pokemonData.sprites.front_default}">
        <div id="stat-container">

       <div >
        <div><span class="stat-title">HP:</span> ${hp}</div>
        <div> <span class="stat-title">ATTACK:</span> ${attack}</div>
        </div>

        <div>
        <div> <span class="stat-title">DEFENSE:</span> ${defense}</div>
        <div> <span class="stat-title">SPEED:</span> ${speed}</div>
        </div>

        </div>


       
        `;

      if (types === "electric") {
        container.style.backgroundColor = "#f1c40f";
      }
      if (types === "fire" || types === "fire, flying") {
        container.style.backgroundColor = "#cd6155";
      }
      if (types === "water") {
        container.style.backgroundColor = "#85c1e9";
      }
      if (types === "dark") {
        container.style.backgroundColor = "#424949";
      }
      if (types === "grass" || types === "grass, poison") {
        container.style.backgroundColor = "#27ae60";
      }
      if (types == "psychic" || types == "psychic, fairy") {
        container.style.backgroundColor = "#d7bde2";
      }

      if (types == "fairy") {
        container.style.backgroundColor = "#e6b0aa";
      }
      if (types === "ice") {
        container.style.backgroundColor = "#d6eaf8";
      }
      if (types === "ghost") {
        container.style.backgroundColor = "#6c3483";
      }
      if (types === "ghost, poison") {
        container.style.backgroundColor = "#6c3483";
      }
      if (types === "poison") {
        container.style.backgroundColor = "#af7ac5";
      }
      if (types === "normal") {
        container.style.backgroundColor = "#D2B48C";
      }
      if (types === "rock, ground") {
        container.style.backgroundColor = "#be9b7b"; //"#a3672b";
      }

      container.classList.add("pokedex-container");

      pokeDexContainer.appendChild(container);
    }
  }

  userInput.addEventListener("input", async () => {
    const query = userInput.value.trim().toLowerCase();

    if (query.length === 0) {
      suggestionBox.innerHTML = "";
      return;
    }

    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1000"
    );
    const data = await response.json();

    const filteredPokemon = data.results.filter((pokemon) =>
      pokemon.name.includes(query)
    );
    filteredPokemon.sort((a, b) => {
      if (a.name.startsWith(query) && !b.name.startsWith(query)) {
        return -1;
      }
      if (!a.name.startsWith(query) && b.name.startsWith(query)) {
        return 1;
      }
      return a.name.localeCompare(b.name);
    });
    suggestionBox.innerHTML = "";
    filteredPokemon.forEach((pokemon) => {
      const suggestion = document.createElement("div");
      suggestion.textContent = pokemon.name;
      suggestion.classList.add("suggestion-area");
      suggestion.addEventListener("click", () => {
        userInput.value = pokemon.name;
        suggestionBox.innerHTML = "";
      });
      suggestionBox.appendChild(suggestion);
    });
  });
});

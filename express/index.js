// Fetching Pokémon data from the local server
const searchBar = document.getElementById('searchBar');
const pokemonDisplay = document.getElementById('pokemonDisplay');

// Function to fetch Pokémon data from the backend
async function fetchPokemon(pokemon) {
    try {
        const response = await fetch(`/pokemon/${pokemon.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        alert(error.message);
    }
}

// Function to display Pokémon data
function displayPokemon(pokemon) {
    pokemonDisplay.innerHTML = `
        <div class="pokemon-card">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h2>${pokemon.name.toUpperCase()}</h2>
            <p>#${pokemon.id}</p>
            <p>Altura: ${pokemon.height / 10} m</p>
            <p>Peso: ${pokemon.weight / 10} kg</p>
            <p>Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        </div>
    `;
}



// Event listener for search bar
searchBar.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const pokemon = searchBar.value;
        if (pokemon) {
            fetchPokemon(pokemon);
            searchBar.value = '';
        }
    }
});

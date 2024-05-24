fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then(response => console.log(response))
    .catch(error => console.error(error));
const inputs = document.querySelectorAll('.radioBtns input')
const search = document.querySelector('#search')
const pokeTypeRadio = document.querySelectorAll('.typeBox input')
const typesSearch = document.querySelector('.typeBox')
const searchBox = document.querySelector('.searchBox')
const greeting = document.querySelector('.greeting')

let offset = 0
let limit = 0
let Pokemons = []
let typeFilter = 'all'
let searchLength = 0
let searchValue = ''

inputs.forEach((btn,id) => {
  btn.addEventListener('click', () => changeGeneration(id))
})


function changeGeneration(id) {


  switch (id) {
    case 0: {
      offset = 0;
      limit = 151;
    }
      break;
    case 1: {
      offset = 151;
      limit = 100;
    }
      break;
    case 2: {
      offset = 251;
      limit = 135;
    }
      break;
    case 3:
      {
        offset = 386;
        limit = 107;
      }
      break;
    case 4:
      {
        offset = 493;
        limit = 156;
      }
      break;
    case 5:
      {
        offset = 649;
        limit = 72;
      }
      break;
    case 6:
      {
        offset = 721;
        limit = 88;
      }
      break;
    case 7:
      {
        offset = 809;
        limit = 96;
      }
      break;
    case 8:
      {
        offset = 905;
        limit = 110;
      }
      break;
  }

  showGeneration()
}

function showGeneration() {
  fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(json => {
      const fetches = json.results.map(item => {
        return fetch(item.url).then(res => res.json())
      })
      Promise.all(fetches).then(res => { ListData(res) })
    })

  const ListData = (data) => {
    Pokemons = data;
    typesSearch.style.visibility='visible';
    searchBox.style.visibility='visible';
    greeting.style.display='none';
    searchKey()
  }

}

const searchKey = (e) => {
  if (e == undefined){
    searchValue = ''
  } else {
    searchValue = e.target.value;
  }
  searchLength = searchValue.length;
pokeSearch(searchValue)
}

function pokeSearch(searchValue) {

  const typePokeSearch = (filterSearch) =>{
    filtered = typeFilter != 'all' ? filterSearch.filter(pokemon => {
      return pokemon.types.map((item, i) => { return `${changeTypeIcon(item.type.name)}` }).join(' ').includes(typeFilter);
    })
      : filterSearch;
  }

  
  filterSearch = searchLength >= 0 ? Pokemons.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(searchValue);
  })
    : Pokemons;
    typePokeSearch(filterSearch)
  

openCards(filtered)
}





const pokeType = (btnId) => {
typeFilter=btnId.target.id; 
  searchKey()
}




const changeTypeIcon = (type) => {

  switch (type) {
    case 'bug':
      return '<img src="./icons/bug.png" alt="bug" title="bug">'
      break;
    case 'dark':
      return '<img src="./icons/dark.png" alt="dark" title="dark">'
      break;
    case 'dragon':
      return '<img src="./icons/dragon.png" alt="dragon" title="dragon">'
      break;
    case 'electric':
      return '<img src="./icons/electric.png" alt="electric" title="electric">'
      break;
    case 'fairy':
      return '<img src="./icons/fairy.png" alt="fairy" title="fairy">'
      break;
    case 'fighting':
      return '<img src="./icons/fighting.png" alt="fighting" title="fighting">'
      break;
    case 'fire':
      return '<img src="./icons/fire.png" alt="fire" title="fire">'
      break;
    case 'flying':
      return '<img src="./icons/flying.png" alt="flying" title="flying">'
      break;
    case 'ghost':
      return '<img src="./icons/ghost.png" alt="ghost" title="ghost">'
      break;
    case 'grass':
      return '<img src="./icons/grass.png" alt="grass" title="grass">'
      break;
    case 'ground':
      return '<img src="./icons/ground.png" alt="ground" title="ground">'
      break;
    case 'ice':
      return '<img src="./icons/ice.png" alt="ice" title="ice">'
      break;
    case 'normal':
      return '<img src="./icons/normal.png" alt="normal" title="normal">'
      break;
    case 'poison':
      return '<img src="./icons/poison.png" alt="poison" title="poison">'
      break;
    case 'psychic':
      return '<img src="./icons/psychic.png" alt="psychic" title="psychic">'
      break;
    case 'rock':
      return '<img src="./icons/rock.png" alt="rock" title="rock">'
      break;
    case 'steel':
      return '<img src="./icons/steel.png" alt="steel" title="steel">'
      break;
    case 'water':
      return '<img src="./icons/water.png" alt="water" title="water">'
      break;

    default:
      break;
  }
}


const openCards = (data) => {
  document.querySelector('.box').innerHTML = data.map((pokemon, i) => {
    return `<div class="card"> <div class="types">
      ${pokemon.types.map((item, i) => { return `${changeTypeIcon(item.type.name)}` }).join(' ')}</div> 
      <img class="pokePic" src="${pokemon.sprites.other.dream_world.front_default}"/> <div class="pokemonName"><h3>#${pokemon.id}, ${pokemon.name} </h3> </div></div>`
  }).join('')
  changeTypeIcon()
  
}



pokeTypeRadio.forEach((btn, id) => {
  btn.addEventListener('click', pokeType)
})
search.addEventListener('input', searchKey)

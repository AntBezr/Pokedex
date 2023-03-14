const inputs = document.querySelectorAll('.radioBtns input')
const search = document.querySelector('#search')

let offset = 0
let limit = 0
let Pokemons = []
let filterList = []
let searchLength = 0
let searchValue = ''
inputs.forEach((btn, id) => {
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
      console.log(json);
      const fetches = json.results.map(item => {
        return fetch(item.url).then(res => res.json())
      })

      Promise.all(fetches).then(res => { console.log(res); ListData(res) })
    })

  const ListData = (data) => {
    Pokemons = data
    searchKey()
  }

}

const searchKey = (e) => {

  if (e == undefined) {
    searchValue = ''
  } else {
    searchValue = e.target.value;
  }
  searchLength = searchValue.length;
  pokeSearch(searchValue)
}

function pokeSearch(searchValue) {

  filterList = searchLength >= 0 ? Pokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchValue);
  })
    : Pokemons;
  openCards(filterList)
}

const changeTypeIcon = () => {
  switch (document.querySelector('.types h4').textContent) {
    case 'grass':
      return document.querySelector('.types h4').textContent = url('./icons/grass.png')
      break;

    default:
      break;
  }
}

const openCards = (data) => {
  document.querySelector('.box').innerHTML = data.map((pokemon, i) => {
    return `<div class="card"> <div class="types"><h4>
      ${pokemon.types.map((item, i) => { return `${item.type.name}` })}
    </h4></div><img src="${pokemon.sprites.other.dream_world.front_default}"/> <div class="pokemonName"><h3>#${pokemon.id}, ${pokemon.name} </h3> </div></div>`
  }).join('')
  changeTypeIcon()
}


search.addEventListener('input', searchKey)

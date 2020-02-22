import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [inputValue, setInputValue] = React.useState("")
  const [pokemonToGet, setPokemonToGet] = React.useState("")
  const [pokemon, setPokemon] = useState(null)
  
  
    useEffect(() => {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonToGet}/`)
            .then(res => res.json())
            .then(res => {
              setPokemon(res)
            })
          }, [pokemonToGet]) // get a new pokemon with the pokemonToGet
  
  function getPokemon() {
      setPokemonToGet(inputValue.trim().toLowerCase())
      setInputValue("")
  }

  
  return (
      <div className="app-wrapper">
        <header>
          <h1 className="title">Mustapha: Week3 React Project</h1>
          <h3 className="subtitle">With Pokémon</h3>
        </header>
        
        <section className= 'wild-pokemon' >
          <h2>Pokemon</h2>
          <div className = 'pokemon'>
              { pokemon
              ? <>
                  <img src={pokemon.sprites.front_default}
                      alt={'Image of ' + pokemon.name}  className="sprite"/>
                  <p className="pokemon-name">Name: {pokemon.name}</p>
                  <p className="pokemon-name">
                      Type: {pokemon.types.map(x => x.type.name).join(', ')}
                  </p>
              </>
              : 'Loading...'
              }
          </div>
        </section>
        <section className = 'input'>
          <input className='search' onChange={(e) => setInputValue(e.target.value)}
              value={inputValue} type="text" placeholder = 'search pokemon'/>
          <button className="catch-btn" onClick={getPokemon}>
              Get Pokemon
          </button>
          <getPokemon pokemonToGet={pokemonToGet} />
        </section>  


      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
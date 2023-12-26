// useEffect: HTTP requests

import * as React from 'react'
import { fetchPokemon,  PokemonInfoFallback, PokemonDataView} from '../pokemon'

import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    if(!pokemonName) return;
    setData(null)
    fetchPokemon(pokemonName)
    .then((data) => {
      setData(data)
    })
  }, [pokemonName])

  if(!pokemonName){
    return <p>Submit a pokemon</p>
  }

  if(!data){
    return <PokemonInfoFallback name={pokemonName} />
  }

  return <PokemonDataView pokemon={data} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App

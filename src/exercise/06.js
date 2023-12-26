// useEffect: HTTP requests

import * as React from 'react'
import { fetchPokemon,  PokemonInfoFallback, PokemonDataView} from '../pokemon'

import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const initialState = {
    status: 'idle',
    data: null,
    error: null
  }
  const [state, setState] = React.useState(initialState);

  React.useEffect(() => {
    if(!pokemonName) return;
    setState({
      status: 'pending'
    })
    fetchPokemon(pokemonName)
    .then((data) => {
      setState({
        status: 'resolved',
        data
      })
    }).catch((error) => {
      setState({error})
      setState({
        status: 'rejected',
        error
      })
    })
  }, [pokemonName])

  const {status, data, error} = state;

  if(status === 'idle'){
    return <p>Submit a pokemon</p>
  }

  if(status === 'rejected') {
    return <div role="alert">Error: {error}</div>
  }

  if(status === 'pending'){
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

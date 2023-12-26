// useEffect: HTTP requests

import * as React from 'react'
import { fetchPokemon,  PokemonInfoFallback, PokemonDataView, PokemonErrorBoundary} from '../pokemon'

import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const initialState = {
    status: pokemonName ? 'pending' : 'idle',
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
    throw error
  }

  if(status === 'pending'){
    return <PokemonInfoFallback name={pokemonName} />
  }

  return <PokemonDataView pokemon={data} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  const handleSubmit = (newPokemonName) => setPokemonName(newPokemonName)

  const handleReset = () => setPokemonName('')

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <div className="pokemon-info">
            <PokemonInfo pokemonName={pokemonName} />
          </div>
        </PokemonErrorBoundary>
    </div>
  )
}

export default App

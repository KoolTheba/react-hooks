// Lifting state

import * as React from 'react'

function Name() {
  // extra: now Name component controlls its own state
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={event => setName(event.target.value)} />
    </div>
  )
}

function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={onAnimalChange}
      />
    </div>
  )
}

function Display({animal}) {
  // extra: new display
  return <div>{`Your favorite animal is: ${animal}!`}</div>
  // return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
}

function App() {
  // extra: now Name component controlls its own state
  // const [name, setName] = React.useState('')
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name 
        // name={name} 
        // onNameChange={event => setName(event.target.value)} 
      />
      <FavoriteAnimal animal={animal} onAnimalChange={event => setAnimal(event.target.value)}/>
      <Display animal={animal} />
    </form>
  )
}

export default App

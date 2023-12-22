// useState: greeting
import * as React from 'react'

function Greeting({initialName = ''}) {
  const [name, setName] = React.useState(initialName);

  const handleChange = (e) => setName(e.target.value)

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App

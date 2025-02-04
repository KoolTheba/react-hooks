// useEffect: persistent state
import * as React from 'react'

const useLocalStorageState = (key, defaultValue = '', {
  serialize = JSON.stringify,
  deserialize = JSON.parse,
} = {}) => {
  const [nameInStorage, setNameInStorage] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
      if(valueInLocalStorage){
        return deserialize(valueInLocalStorage)
      }
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  })

  // controlls changes in key, keeping previous reference
  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if(prevKey !== key){
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(nameInStorage))
  }, [key, nameInStorage, serialize])
  
  return [
    nameInStorage,
    setNameInStorage
  ]
}

function Greeting({initialName = ''}) {
  // use the custom hook
  const [name, setName] = useLocalStorageState('name', initialName)

  const handleChange = (event) => setName(event.target.value)

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App

import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState("")
  const [ showAll, setShowAll ] = useState(true)


  const addPerson = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }
    if(persons.some(person => person.name === newName) === true){
      alert(`${newName} is already in the phonebook`)
    } else {
      setPersons(persons.concat(newObject))
    } 
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewSearch(event.target.value)
    if(`${newSearch.length}` > 0){
      setShowAll(false)
    } else{
      setShowAll(true)
    }
  }

  const personsToShow = showAll ? persons : persons.filter(person => person.name.includes(`${newSearch}`))

  return (
    <div>
      <h2>phonebook</h2>
      <div></div>
      <div>filter by name: <input value={newSearch} onChange={handleFilterChange} /></div>
      <h2>add a new</h2>
      <form onSubmit={addPerson} >
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => <div key={person.name} > {person.name} {person.number} </div>)}
    </div>
  )
}

export default App


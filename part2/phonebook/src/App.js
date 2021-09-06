import React, { useState } from 'react'

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(person => <div key={person.name} > {person.name} {person.number} </div>)}
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson} >
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Filter = ({newSearch, handleFilterChange}) => {
  return (
  <div>filter by name: <input value={newSearch} onChange={handleFilterChange} /></div>
  )
}

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
      <Filter
        newSearch={newSearch}
        handleFilterChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App


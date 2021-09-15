import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({name, number, handleClick}) => {
  return (
    <div>
    {name} {number} 
    <button onClick={handleClick} > delete</button>
    </div>
  )
}

const ErrorNotification = ({message}) => {
  const notificationStyle = {
    color: "red",
    fontStyle: "italic",
    fontSize: 20
  }

  if(message === null){
    return null
  }

  return(
    <div style={notificationStyle} >
      {message}
    </div>
  )
}

const Notification = ({message}) => {
  const notificationStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 20
  }

  if(message === null){
    return null
  }

  return(
    <div style={notificationStyle} >
      {message}
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
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  
  useEffect(()=> {
    personService
      .getAll()
      .then(initialPerson => setPersons(initialPerson) )
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }
    const person = persons.find(n => n.name === newName)
    const changedPerson = {...person, number: newNumber}
    
    if(persons.some(person => person.name === newName) === true){
      if(window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)){
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => setPersons(persons.map(p => p.id !== person.id ? person : returnedPerson)))
        setNotificationMessage(`Updated ${newName} phone number`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
      }
    } else {
      personService
      .create(newObject)
      .then(initialPerson => setPersons(persons.concat(initialPerson)))
      setNotificationMessage(`Added ${newName} to the phonebook`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDeletePerson = (id, name) => {
    if(window.confirm(`Do you want to remove ${name}?`)) {
    personService
      .remove(id)
      .catch(error => {
        setErrorMessage(`${name} was already removed from the phonebook`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    setPersons(persons.filter(person => person.id !== id))
  }
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
      <ErrorNotification message={errorMessage} />
      <Notification message={notificationMessage} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {personsToShow.map(person => <Person key={person.id} name={person.name} number={person.number} handleClick={() => handleDeletePerson(person.id, person.name)} />)}
    </div>
  )
}

export default App


import React, { useState, useEffect } from 'react'
import Persons from './components/persons'
import PersonForm from './components/personform'
import Filter from './components/filter'
import axios from 'axios'
const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ flt, setFlt ] = useState('')
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter flt={flt} setFlt={setFlt}/>
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h3>Numbers</h3>
      <Persons persons={persons} flt={flt}/>
    </div>
  )
}

export default App
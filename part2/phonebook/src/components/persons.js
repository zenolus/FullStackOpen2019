import React from 'react'
const Persons = ({persons, flt}) => {
    const selectedPersons = persons.filter((person)=>{
      return person.name.toLowerCase().includes(flt.toLowerCase())
    })
    return selectedPersons.map((person, i) => <div key={i}>{person.name} {person.number}</div>)
}
export default Persons
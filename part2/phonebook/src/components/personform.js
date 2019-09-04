import React, {useState} from 'react'
const PersonForm = ({persons, setPersons}) => {
    const [ newName, setNewName ] = useState('')
    const [ newNum, setNewNum ] = useState('')
    const onClick = (event) => {
        event.preventDefault()
        const newPerson = {
          name: newName,
          number: newNum
        }
        if(persons.find((person) => person.name === newName)){
          window.alert(`${newName} is already added to phonebook`)
        }
        else
          setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNum('')
    }
    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumChange = (event) => setNewNum(event.target.value)
    return (
        <div>
            <form>
                <div>
                    name:
                    <input 
                        value={newName}
                        onChange={handleNameChange}/>
                    <br/>
                    number:
                    <input
                        value={newNum}
                        onChange={handleNumChange} />
                    </div>
                    <div>
                    <button type="submit" onClick={onClick}>add</button>
                </div>
            </form>
        </div>
    )
}
export default PersonForm
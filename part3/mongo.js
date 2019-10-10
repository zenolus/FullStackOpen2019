const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
//const url = `mongodb+srv://fullstackopen:${password}@testcluster-xrpy3.mongodb.net/test?retryWrites=true&w=majority`
const url = `mongodb+srv://fullstackopen:${password}@testcluster-xrpy3.mongodb.net/phonebook-app-fso?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser : true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    //id: Number,
})

const Person = mongoose.model('Person', personSchema)
const addPerson = () => {
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(response => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}

const showPersons = () => {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}
if(process.argv.length < 5)
    showPersons()
else
    addPerson()
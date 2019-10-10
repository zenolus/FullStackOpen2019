require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Person = require('./models/person')
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(morgan(function (tokens, req, res) {
    let ret = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ]
    if(String(tokens.method(req, res)) == "POST")
        ret = ret.concat(JSON.stringify(req.body))
    return ret.join(' ')
}))
const errorHandler = (error, request, response, next) => {
    //console.log(error.message)
    if(error.name === 'CastError' && error.kind === 'ObjectId')
        return response.status(400).send({error: 'malformatted id'})
    else if(error.name === 'ValidationError')
        return response.status(400).json({error: error.message})
    next(error)
}
app.use(errorHandler)
app.get('/api/persons', (request, response)=>{
    Person.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()))
    })
})
app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        const n = persons.length
        const dt = new Date()
        const res = `
        <p>Phonebook has info for ${n} people</p>
        <p>${dt}</p>`
        response.send(res)
    })
})
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person)
                response.json(person.toJSON())
            else
                response.status(404).end()
        })
        .catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndRemove(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, {new:true})
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})
app.post('/api/persons', (request, response, next) => {
    const body = request.body
    Person.find({})
        .then(persons => {
            persons.map(person => person.toJSON())
            if(persons.find(person => person.name === body.name)){
                return response.status(400).json({error: 'name must be unique'})
            }
            const person = new Person({
                name: body.name,
                number: body.number
            })
            person.save().then(savedPersons => {
                console.log(savedPersons.toJSON())
                response.json(savedPersons.toJSON())
            }).catch(error => next(error))
        })
})
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
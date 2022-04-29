require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

// eslint-disable-next-line no-unused-vars
morgan.token('body', (request, response) => JSON.stringify(request.body))

//Middleware

app.use(express.static('build'))

app.use(express.json())

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.use(cors())

app.get('/', (request, response) => {
  response.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((person) => {
      response.json(person)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const { id } = request.params
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.get('/api/info', (request, response, next) => {
  const date = new Date()
  Person.countDocuments({})
    .then((count) => {
      response.send(`<p>Phonebook has info for ${count} people</p>
    <p>${date}</p>`)
    })
    .catch((error) => next(error))
})

//POST

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const newPerson = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  })

  newPerson
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  const { id } = request.params

  Person.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const { id } = request.params
  Person.findByIdAndRemove(id)
    // eslint-disable-next-line no-unused-vars
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

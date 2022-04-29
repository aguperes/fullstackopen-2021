/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv').config()
const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI

mongoose.connect(uri)

console.log('connected to mongodb')

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
  date: Date,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person)
    })
    mongoose.connection.close()
    console.log('disconnected')
    process.exit(1)
  })
} else {
  const name = process.argv[2]
  const number = process.argv[3]

  const person = new Person({
    name: name,
    number: number,
    date: new Date(),
  })

  person.save().then((result) => {
    console.log(`Added ${person.name} number ${person.number} to the phonebook`)
    mongoose.connection.close()
    console.log('disconnected')
    process.exit(1)
  })
}

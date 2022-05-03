require('dotenv').config()
const express = require('express')
const app = express()
const Result = require('./models/result')
const cors = require('cors')
const { response } = require('express')

//This file contains all information of api calls
//every call returns data in JSON format

app.use(cors())
app.use(express.json({ limit: '25mb' }))
app.use(express.urlencoded({ limit: '25mb' }))

//get all data available
app.get('/api/results', (request, response) => {
    Result.find({}).then(results => {
        response.json(results)
    })
})

//single search using id
app.get('/api/results/:id', (request, response) => {
    Result.findById(request.params.id)
        .then(result => {
            if (result) {
                response.json(result)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

//single search which returns latest one recorded
app.get('/api/getLatest', (request, response) => {
    Result.findOne({}, {}, { sort: { 'date': -1 } }, function (err, result) {
        console.log(result)
        if (result) {
            response.json(result)
        } else {
            response.json({})
        }
    })
})


//add new item
app.post('/api/addResult', (request, response) => {
    const body = request.body
    console.log(request.body)

    const result = new Result({
        date: body.date,
        data: body.data,
        client: body.client
    })

    result.save().then(savedResult => {
        response.json(savedResult)
    })
})

//remove item by id
app.delete('/api/results/:id', (request, response, next) => {
    Result.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

//update client name with id
app.put('/api/update/:id', (request, response) => {

    Result.findByIdAndUpdate(request.params.id, { client: request.body.client }, { new: true })
        .then(updatedResult => {
            response.json(updatedResult)
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
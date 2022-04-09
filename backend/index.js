require('dotenv').config()
const express = require('express')
const app = express()
const Result = require('./models/result')
const cors = require('cors')
const { response } = require('express')

app.use(cors())
app.use(express.json())

//get all
app.get('/api/results', (request, response) => {
    Result.find({}).then(results => {
        response.json(results)
    })
})
//get id, date and possible client of every item


//single search
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

//get latest
app.get('/api/getlatest', (request, response) => {
    Result.findOne({}, {}, { sort: { 'created_at': -1 } }, function (err, result) {
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
        //text: body.text
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

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
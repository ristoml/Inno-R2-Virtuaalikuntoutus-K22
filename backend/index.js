
require('dotenv').config()
const express = require('express')
const app = express()
const Result = require('./models/result')
const cors = require('cors')

app.use(cors())
app.use(express.json())

//kaikkien haku
app.get('/api/results', (request, response) => {
    Result.find({}).then(results => {
        response.json(results)
    })
})

//lisääminen
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

//poisto
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
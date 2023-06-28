import express from 'express'
import controller from './controller/index.js'
import bodyParser from 'body-parser'
// EXPRESS
const app = express()
const PORT = 3000

// app.use(cors({ origin: "*" }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// AUTHENTICATION POST REQUEST
controller(app)

// LISTENER
app.listen (PORT, () => console.log(`Server running on localhost:${PORT}`))
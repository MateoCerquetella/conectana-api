import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routing from './routing'
// Declare server
const app = express()
routing(app)
// CORS configuration
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Set the port
app.set('port', process.env.PORT || 3000)

// Start the server
app.listen(app.get('port'), () => {
    console.log('server on port:', app.get('port'))
})

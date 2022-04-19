const express = require('express')
const favsRouter = require('./routes/favs')
const loginRouter = require('./routes/login')
const userRouter = require('./routes/user')
const app = express()
require('./db')
const PORT = 3001

app.use(express.json())

app.use('/auth/local/login', loginRouter)

app.use('/api/users', userRouter)

app.use('/api/favs', favsRouter)

app.get('/', (req, res) => {
    const text = '<h1>Hola</h1>'
    res.send(text)
})





















const server = app.listen(PORT, ( ) => {
    console.log(`El servidor esta escuchando en el puerto ${PORT}`)
})



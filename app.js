const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 5173
require('dotenv').config()
const productRoute = require('./routes/product.route')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/api/products', productRoute)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to mongodb')
        app.listen(port, () => {
            console.log(`server started on  http://localhost:${port}`)
        })
    })
    .catch(er => {
        console.log("connect failed")
    })

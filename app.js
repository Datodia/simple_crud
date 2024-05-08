const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model')
const app = express()
const port = 5173
require('dotenv').config()

app.use(express.json())


app.get('/', (req, res) => {
    res.send('hello world')
})


app.get('/api/products', async (req, res) => {
    try{
        const procuts = await Product.find()
        res.json(procuts)
    }catch(err){
        res.status(500).send('Internal server error')
    }
})

app.get('/api/products/:id', async (req, res) => {
    try{
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    }catch(err){
        res.status(500).send('Internal server error')
    }
})

app.post('/api/products', async (req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(201).json(product)
    }catch(er){
        res.status(500).send('Internal server error')
    }
})


app.put('/api/products/:id', async (req, res) => {
    try{
        const { id } = req.params   
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            return res.status(404).send('Product not found')
        }
        
        const updatedProduct = await Product.findById(id)

        res.status(200).json(updatedProduct)
    
    }catch(er){
        res.status(500).send('Internal server error')
    }
})

app.delete('/api/products/:id', async (req, res) => {
    try{
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).send('Product not found')
        }   
        res.status(204).send(product)  
    }catch(er){
        res.status(500).send('Internal server error')
    }
})

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

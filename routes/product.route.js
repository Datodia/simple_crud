const express = require('express')
const route = express.Router()
const {getAllProducts, getProductsById, createProduct, updatedProduct, deleteProduct} = require('../controllers/product.controller')


route.get('/', getAllProducts)

route.get('/:id', getProductsById)

route.post('/', createProduct)

route.put('/:id', updatedProduct)

route.delete('/:id', deleteProduct)

module.exports = route

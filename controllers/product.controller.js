const Product = require("../models/product.model")


async function getAllProducts(req, res){
    try{
        const procuts = await Product.find()
        res.json(procuts)
    }catch(err){
        res.status(500).send('Internal server error')
    }
}

async function getProductsById(req, res){
   try{
        console.log('shemovida')
        const { id } = req.params
        const product = await Product.findById(id)
        console.log(id, "id")
        res.status(200).json(product)
    }catch(err){
        res.status(500).send('Internal server error')
    }
}

async function createProduct(req, res){
   try{
        const product = await Product.create(req.body)
        res.status(201).json(product)
    }catch(er){
        res.status(500).send('Internal server error')
    }
}

async function updatedProduct(req, res){
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
}

async function deleteProduct(req, res){
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
}


module.exports = {getAllProducts, getProductsById, createProduct, updatedProduct, deleteProduct}

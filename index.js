const express = require('express')
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product.model')

app.use(express.json())
app.use(express.urlencoded({ extended:false }))


app.get('/', (req,res)=>{
    res.send('hello from node api')
})

app.get('/api/products', async(req, res)=>{

    try{
      const products =  await Product.find({},{name:1});
      res.status(200).json(products);
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

app.get('/api/products/:id', async(req,res)=>{
    try{
        const { id } = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product);
    } 
    catch(err){
        res.status(500).json({message:err.message})
    }
})


app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

//update
app.put('/api/product/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)

        if (!product){
            return res.status(404).json({message: "error 404"})
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)

    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//delete
app.delete('/api/product/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const product = await Product.findById(id);

        if(!product){
            res.status(404).json("product not found")
        }

        const deleteProduct = await Product.findByIdAndDelete(id)
        res.status(200).json(deleteProduct)

    } catch (err){
        res.status(500).json({message: err.message})
    }
})




mongoose.connect("mongodb+srv://menosuper6:jlsjQYZHVDfBsSE8@backenddb.7fo6crv.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
    console.log("DB connected");
    app.listen(3000, ()=>{
    console.log("server is listening on 3000");
})

})
.catch(()=>{
    console.log("connection unsucessful");
})
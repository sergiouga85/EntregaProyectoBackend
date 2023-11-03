import {PORT,PRODUCTOS_JSON} from './config.js'
import express from 'express'
import {ProductsManager} from './ProductsManager.js'

const pm= new ProductsManager(PRODUCTOS_JSON)

const app=express()

app.use(express.json())

app.get('/api/products',async (req, res)=>{
    const limit=parseInt(String(req.query.limit));
    try{
        const products= await pm.getAll({limit})
        res.json(products)
    }catch(error){
        res.json({
            status:'error',
            message: error.message
        })
    }

}) 

app.get('/api/products/:pid', async (req, res)=>{
    const id= req.params.pid
    try{
        const products = await pm.getById(id)
        res.json(products)
    } catch(error){
        res.json({
            status:'error',
            message: error.message
        })
    }
}) 


app.post('/api/products',async (req,res)=>{
    const {title,description,code,price,status,stock,category,thumbnail} = req.body
    try{
        const productAgregado = await pm.addProducts({title,description,code,price,status,stock,category,thumbnail});
        res.json(productAgregado)
    } catch(error){
        res.json({
            status:'error',
            message: error.message
        })
    }  
})

app.put('/api/products/:pid',async (req,res)=>{
    
    const id= req.params.pid
    const {title,description,code,price,status,stock,category,thumbnail} = req.body
    try{
        const productActualizado = await pm.updateProducts(id,{title,description,code,price,status,stock,category,thumbnail});
        res.json(productActualizado)
    } catch(error){
        res.json({
            status:'error',
            message: error.message
        })
    }  
})

app.delete('/api/products/:pid',async (req,res)=>{
    const id= req.params.pid
    try{
        const productDelete= await pm.deleteProducts(id);
        res.json(productDelete)
    } catch(error){
        res.json({
            status:'error',
            message: error.message
        })
    }
    
})

app.get('/',(req, res)=>{
    res.sendFile('index.html', {root:'./views'})
}) 

app.use((err,req,res,next)=>{
    res.json({
        status:'error',
        description: err.message
    })
})

app.listen(PORT, ()=>{
    console.log(`conectado y escuchando en puerto ${PORT}`)
})
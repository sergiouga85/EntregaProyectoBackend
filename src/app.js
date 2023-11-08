import {PORT,CARRITO_JSON} from './config.js'
import express from 'express'
import {cartsRouter} from '../routes/cartsRouter.js'
import {productsRouter} from '../routes/productsRouter.js'
import { CartsManager } from './CartsManager.js'

const app=express()

app.use(express.json())
app.use(express.static('./views'))

app.use('/api/carts',cartsRouter)
app.use('/api/products',productsRouter)

app.get('/',(req, res)=>{
    res.sendFile('index.html', {root:'./views'})
}) 

app.use((err,req,res,next)=>{
    res.json({
        status:'error',
        description: err.message
    })
})

app.listen(PORT,async ()=>{ 
    console.log(`conectado y escuchando en puerto ${PORT}`)
})
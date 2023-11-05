import {PORT} from './config.js'
import express from 'express'

const app=express()

app.use(express.json())

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
    await cm.loadData(); 
    console.log(`conectado y escuchando en puerto ${PORT}`)
})